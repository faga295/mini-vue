let isFlushing = false;
export function queueJob(job: Function) {
  const queue = new Set<Function>();
  queue.add(job);

  if (!isFlushing) {
    isFlushing = true;
    Promise.resolve().then(() => {
      queue.forEach(fn => {
        fn();
      });
      isFlushing = false;
      queue.clear();
    });
  }
}
