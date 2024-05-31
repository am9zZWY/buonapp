export default function() {
  const workerId = ref<string | null>(null)
  const worker = ref<Worker | null>(null)
  const channel = ref<MessageChannel | null>(null)
  const message = ref<string | null>(null)
  const status = ref<string | null>(null)
  const onmessage = ref<(event: MessageEvent) => void>(() => {
  })

  const supported_tasks: Task[] = ['summarize', 'sort']
  type Task = 'summarize' | 'sort'

  /**
   * Initialize a worker with a task
   * @param task The task to initialize the worker with
   * @returns The id of the worker
   */
  function createWorker(task: Task): string {
    const url = `../services/LTf.${task}.worker.ts`
    const randomId = Math.random().toString(36).substring(7)
    console.debug(`Trying to create worker for task ${task} with id ${randomId}`)

    if (supported_tasks.includes(task)) {
      const newWorker = new Worker(new URL(url, import.meta.url), {
        type: 'module',
        name: `LTf ${task} worker ${randomId}`
      })
      newWorker.onmessage = (event) => {
        const workerData = event.data
        status.value = workerData.status
        onmessage.value(event)

        switch (workerData.type) {
          case 'ready':
            console.log(`Worker with id ${randomId} is ready`)
            message.value = workerData
            break
          case 'progress':
            console.log(`Worker with id ${randomId} is`, workerData.status)
            message.value = workerData
            break
          case 'finished':
            console.log(`Worker with id ${randomId} finished`)
            message.value = workerData
            break
          case 'error':
            console.error(`Worker with id ${randomId} encountered an error:`, workerData.error)
            break
          default:
            break
        }
      }
      newWorker.onerror = (event) => {
        console.error(`Worker with id ${randomId} encountered an error: ${event}`)
      }
      worker.value = newWorker

      workerId.value = randomId

      const newChannel = new MessageChannel()
      channel.value = newChannel

      console.log(`Created worker for task ${task} with id ${randomId}`)
    } else {
      console.error(`Task ${task} is not supported`)
    }

    return randomId
  }

  /**
   * Terminate a worker
   */
  function removeWorker() {
    const status = false
    if (worker.value !== null && channel.value !== null) {
      worker.value.terminate()
      channel.value.port1.close()
    } else {
      console.error(`Worker with id ${workerId.value} not found`)
    }

    if (status) {
      console.log(`Terminated worker with id ${workerId.value}`)
    } else {
      console.error(`Failed to terminate worker with id ${workerId.value}`)
    }

    return status
  }

  /**
   * Start a worker by id
   * @param data
   */
  function startTask(data: unknown) {
    if (worker.value !== null && channel.value !== null) {
      worker.value.postMessage({ type: 'init' }, [channel.value.port1])
      worker.value.postMessage({ type: 'data', data: data }, [channel.value.port2])
      console.log(`Started worker with id ${workerId.value}`)
    } else {
      console.error(`Worker with id ${workerId.value} not found`)
    }
  }

  return {
    workerId,
    createWorker,
    onmessage,
    removeWorker,
    startTask,
    status,
    message
  }
}
