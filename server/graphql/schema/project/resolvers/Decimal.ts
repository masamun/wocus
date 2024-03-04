import { GraphQLScalarType, Kind } from "graphql";
import { Prisma } from "~/prisma";

export const Decimal = new GraphQLScalarType({
  name: "Decimal",
  description: "Decimal description",
  serialize: (value) => {
    if (!Prisma.Decimal.isDecimal(value)) {
      throw new Error(`Decimal Serialize Error Invalid argument: ${Object.prototype.toString.call(value)}`);
    }
    return (value as Prisma.Decimal).toString();
  },
  parseValue: (value) => {
    if (!(typeof value === "string")) {
      throw new Error(`Decimal ParseValue Error Invalid argument: ${typeof value}. Expected string`);
    }
    return new Prisma.Decimal(value);
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
      return new Prisma.Decimal(ast.value);
    }
    throw new Error(`Decimal ParseLiteral Error Invalid argument: ${ast.kind}`);
  },
});
