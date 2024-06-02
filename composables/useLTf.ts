type Task = 'summarize' | 'rank'
type WorkerStatus = 'ready' | 'progress' | 'finished' | 'error'

/**
 * A composable to create a worker for Local Transformers
 * @Example
 * ```
 * const worker = useLTf('summarize')
 * worker.startTask(['Transformers are a type of neural network. They are used for natural language processing.'])
 * const summary = computed(() => worker.data)
 * ```
 * @param task The task to initialize the worker with (optional)
 */
export default function(task?: Task) {
  /**
   * The id of the worker
   */
  const workerId = ref<string | null>(null)
  /**
   * The worker
   */
  const worker = ref<Worker | null>(null)
  const channel = ref<MessageChannel | null>(null)
  /**
   * Last message from the worker
   */
  const message = ref<string | null>(null)
  /**
   * Data from the worker when it is finished
   */
  const data = ref<unknown | null>(null)
  /**
   * The status of the worker: `ready`, `progress`, `finished`, `error`
   */
  const status = ref<WorkerStatus | null>(null)
  /**
   * Define a callback for when the worker sends a message
   */
  const onmessage = ref<(event: MessageEvent) => void>(() => {
  })
  /**
   * Define a callback for when the worker sends data
   */
  const ondatacallback = ref<(data: unknown) => void>(() => {
  })

  /**
   * Supported tasks. Initialize the worker with one of these tasks
   * @Example
   * ```
   * const worker = useLTf('summarize')
   * ...
   * ```
   */
  const supported_tasks: Task[] = ['summarize', 'rank']

  /**
   * Initialize a worker with a task
   * @Example
   * ```
   * const worker = useLTf()
   * worker.createWorker('summarize')
   * ...
   *
   * @param task The task to initialize the worker with
   * @returns The id of the worker
   */
  function createWorker(task: Task): string {
    const url = `../services/LTf.${task}.worker.ts`
    const name = `${task}-${Math.random().toString(36).substring(7)}`
    console.debug(`Trying to create worker for task ${task} with id ${name}`)

    if (supported_tasks.includes(task)) {
      const newWorker = new Worker(new URL(url, import.meta.url), {
        type: 'module',
        name: `LTf ${task} worker ${name}`
      })
      newWorker.onmessage = (event) => {
        const workerMessage = event.data
        status.value = workerMessage.status
        onmessage.value(event)

        if (workerMessage.type === 'ready' || workerMessage.type === 'progress' || workerMessage.type === 'finished') {
          if (workerMessage.type === 'finished') {
            console.debug(`Worker with id ${name} finished`)
            data.value = workerMessage.data
            ondatacallback.value(data.value)
          }

          message.value = workerMessage
          console.debug(`Worker with id ${name} sent a message:`, workerMessage)
        } else if (workerMessage.type === 'error') {
          console.error(`Worker with id ${name} encountered an error:`, workerMessage.error)
        } else {
          console.error(`Worker with id ${name} sent an unknown message:`, workerMessage)
        }
      }
      newWorker.onerror = (event) => {
        console.error(`Worker with id ${name} encountered an error: ${event}`)
      }
      newWorker.onmessageerror = (event) => {
        console.error(`Worker with id ${name} encountered a message error: ${event}`)
      }
      worker.value = newWorker

      // Set worker id
      workerId.value = name

      // Create a message channel
      const newChannel = new MessageChannel()
      channel.value = newChannel

      newWorker.postMessage({ type: 'init' })

      console.log(`Created worker for task ${task} with id ${name}`)
    } else {
      console.error(`Task ${task} is not supported`)
    }

    return name
  }

  if (task) {
    createWorker(task)
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
      worker.value.postMessage({ type: 'data', data: data })
      console.debug(`Started worker with id ${workerId.value}`)
    } else {
      console.error(`Worker with id ${workerId.value} not found`)
    }
  }

  return {
    createWorker,
    startTask,
    removeWorker,
    workerId,
    onmessage,
    ondatacallback,
    status,
    message,
    data
  }
}
