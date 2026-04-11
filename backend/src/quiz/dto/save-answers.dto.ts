export class AnswerItemDto {
  readonly questionId!: number;
  readonly optionId!: number;
}

export class SaveAnswersDto {
  readonly answers!: AnswerItemDto[];
}
