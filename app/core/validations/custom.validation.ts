import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "hourValidation", async: false })
export class hourValidation implements ValidatorConstraintInterface {

    validate(text: string) {
        const isValidHour = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(text);
        return isValidHour;
    }

    defaultMessage(args: ValidationArguments) {
        return "($value) invalid!";
    }

}


@ValidatorConstraint({ name: "dateValidation", async: false })
export class dateValidation implements ValidatorConstraintInterface {

    validate(text: string) {
        const isValidDate = /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/.test(text);
        return isValidDate;
    }

    defaultMessage(args: ValidationArguments) {
        return "($value) Geçersiz Tarih, Ör: 2022-03-28";
    }

}


export function IsBiggerThan(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isBiggerThan',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            return typeof value === 'number' && typeof relatedValue === 'number' && value > relatedValue;
          },
        },
      });
    };
}