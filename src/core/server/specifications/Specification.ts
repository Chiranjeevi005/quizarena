export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean;
  toPrismaWhere(): any;
}

export abstract class Specification<T> implements ISpecification<T> {
  public abstract isSatisfiedBy(candidate: T): boolean;
  public abstract toPrismaWhere(): any;

  public and(other: Specification<T>): Specification<T> {
    return new AndSpecification<T>(this, other);
  }

  public or(other: Specification<T>): Specification<T> {
    return new OrSpecification<T>(this, other);
  }

  public not(): Specification<T> {
    return new NotSpecification<T>(this);
  }
}

export class AndSpecification<T> extends Specification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }

  public toPrismaWhere(): any {
    return {
      AND: [this.left.toPrismaWhere(), this.right.toPrismaWhere()],
    };
  }
}

export class OrSpecification<T> extends Specification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }

  public toPrismaWhere(): any {
    return {
      OR: [this.left.toPrismaWhere(), this.right.toPrismaWhere()],
    };
  }
}

export class NotSpecification<T> extends Specification<T> {
  constructor(private spec: Specification<T>) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }

  public toPrismaWhere(): any {
    return {
      NOT: this.spec.toPrismaWhere(),
    };
  }
}
