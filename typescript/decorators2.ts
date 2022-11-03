// 2. Create decorator to catch errors returned from the child class
//@ts-
@CreatedAt
class UserService2 implements IUserService {
  users: number = 1000;

  @Catch(true)
  getUsersInDatabase(): number {
    return this.users;
  }
}

function Catch(rethrow: boolean = false) {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    const method = descriptor.value;

    descriptor.value = async (...args: any[]) => {
      try {
        return method?.apply(target, args);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
          if (rethrow) {
            throw e;
          }
        }
      }
    };
  };
}
