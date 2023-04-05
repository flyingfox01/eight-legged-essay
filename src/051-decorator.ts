import "reflect-metadata";

function classDecorator<T extends {
  new(...args: any[]): {}
}>(constructor: T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.configurable = value;
  };
}

const formatMetadataKey = Symbol("format");
function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

const requiredMetadataKey = Symbol("required");
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    let method = descriptor.value as any;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        return method.apply(this, arguments);
    }
}

@classDecorator
class Greeter {
  private property = "property";
  private hello: string;
  @format("Hello, %s")
  private greeting: string;
  constructor(m: string) {
    this.hello = m;
    this.greeting = m
  }

  @enumerable(false)
  @validate
  greet(@required name: string) {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", name + ',' + this.greeting);
  }
 
  @configurable(false)
  get prop() { return this.property; }
}

const test = new Greeter("world")

console.log(test);
console.log(test.greet('bob'));

export default Greeter;

