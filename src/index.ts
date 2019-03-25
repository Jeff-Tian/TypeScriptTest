export default class MainClass {
  @log("test")
  test() {
    console.log("hello, world!", this.constructor.name);
  }
}

export function log(name: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function() {
      const start = new Date();

      let res;

      try {
        res = originalMethod.apply(this, arguments);
        return res;
      } catch (ex) {
        res = JSON.stringify(ex);
        throw ex;
      } finally {
        const end = new Date();
        const duration = end.getTime() - start.getTime();

        console.log(
          "method cost ",
          duration,
          " by ",
          this.constructor.name,
          " res = ",
          res
        );
      }
    };
  };
}

new MainClass().test();
