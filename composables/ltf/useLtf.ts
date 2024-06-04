import SummarizeWorker from './LTf.summarize.worker.js?worker'
import RankWorker from './LTf.rank.worker.js?worker'
import { ref } from 'vue'

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
  const workerTask = ref<Task | null>(null)
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
   * Download progress for each transformer model
   */
  const downloads = ref<{ [key: string]: number }>({})
  /**
   * Total download progress in percentage
   */
  const downloadProgress = computed<number>(() => {
    const current = Object.values(downloads.value).reduce((acc, curr) => acc + curr, 0)
    const total = Object.values(downloads.value).length * 100
    return Math.round((current / total) * 100)
  })
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
   * Initialize a worker with a task.
   * This does not need to be called manually if the task is passed to the composable.
   * After the worker is created, it can be started with `worker.startTask(data)`
   *
   * @Example
   * ```
   * const worker = useLTf()
   * worker.createWorker('summarize')
   * ...
   * ```
   *
   * @param task The task to initialize the worker with
   * @returns The id of the worker
   */
  function createWorker(task: Task): string {
    const name = `${task}-${Math.random().toString(36).substring(7)}`
    console.debug(`Trying to create worker for task ${task} with id ${name} ...`)

    let newWorker: Worker
    if (task === 'summarize') {
      newWorker = new SummarizeWorker()
    } else if (task === 'rank') {
      newWorker = new RankWorker()
    } else {
      throw new Error('Task not supported: ' + task)
    }


    workerTask.value = task

    newWorker.onmessage = (event) => {
      const workerMessage = event.data
      status.value = workerMessage.status
      onmessage.value(event)

      if (workerMessage.type === 'ready' || workerMessage.type === 'progress' || workerMessage.type === 'finished') {
        if (workerMessage.type === 'finished') {
          console.debug(`Worker with id ${name} finished`)
          data.value = workerMessage.data
          ondatacallback.value(data.value)
        } else if (workerMessage.type === 'progress') {
          const downloadStatus = workerMessage.status
          const modelName = downloadStatus.name + downloadStatus.file

          if (!downloads.value[modelName]) {
            downloads.value[modelName] = downloadStatus.progress
          }

          if (downloads.value[modelName] < downloadStatus.progress) {
            downloads.value[modelName] = downloadStatus.progress
          }
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
      console.error(`Worker with id ${name} encountered an error:`, event)
    }
    newWorker.onmessageerror = (event) => {
      console.error(`Worker with id ${name} encountered an error:`, event)
    }
    worker.value = newWorker

    // Set worker id
    workerId.value = name

    // Create a message channel
    const newChannel = new MessageChannel()
    channel.value = newChannel

    newWorker.postMessage({ type: 'init' })

    console.log(`Successfully created worker for task ${task} with id ${name}`)

    return name
  }

  if (task) {
    createWorker(task)
  }

  /**
   * Terminate the worker
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
   * Start a task with the worker
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
    downloads,
    downloadProgress,
    workerId,
    onmessage,
    ondatacallback,
    status,
    message,
    data
  }
}
