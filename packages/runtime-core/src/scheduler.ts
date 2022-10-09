let isFlushing = false;
const p = Promise.resolve();
export function queueJob(job: Function) {
  const queue = new Set<Function>();
  queue.add(job);
  console.log(queue);

  if (!isFlushing) {
    isFlushing = true;
    p.then(() => {
      console.log('micro');
      queue.forEach(fn => fn());
    });
    isFlushing = false;
    queue.clear();
  }
}
