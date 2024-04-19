import type { Assembly, AssemblyProperty } from '~core/assembly/assembly'

export function defaultReportAggregation(): ReportAggregation {
  return new ReportAggregation([
    ReportBlock.create([
      Report.create('ap'),
      Report.create('attitudeStability'),
    ]),
    ReportBlock.create([
      Report.create('antiKineticDefense'),
      Report.create('antiEnergyDefense'),
      Report.create('antiExplosiveDefense'),
    ]),
    ReportBlock.create([
      Report.create('weight'),
      Report.create('load'),
      Report.create('loadLimit'),
    ]),
    ReportBlock.create([
      Report.create('enLoad'),
      Report.create('enOutput'),
      Report.create('enSurplus'),
      Report.create('enSupplyEfficiency'),
      Report.create('enRechargeDelay'),
    ]),
    ReportBlock.create([Report.create('coam')]),
  ])
}

export class ReportAggregation {
  static fromDto(blockDtoList: readonly ReportBlockDto[]): ReportAggregation {
    return new ReportAggregation(blockDtoList.map(ReportBlock.fromDto))
  }

  constructor(private readonly _blocks: readonly ReportBlock[]) {}

  get blocks(): readonly ReadonlyReportBlock[] {
    return this._blocks
  }
}

export type ReportStatus = 'danger' | 'warning' | 'normal'

type ReadonlyReportBlock = ReportBlock
type ReadonlyReport = Report

class ReportBlock {
  static create(reports: Report[]): ReportBlock {
    return new ReportBlock(crypto.randomUUID(), reports, true)
  }
  static fromDto(dto: ReportBlockDto): ReportBlock {
    return new ReportBlock(dto.id, dto.reports.map(Report.fromDto), dto.show)
  }

  private constructor(
    readonly id: string,
    private readonly _reports: readonly Report[],
    readonly show: boolean,
  ) {}

  get reports(): readonly ReadonlyReport[] {
    return this._reports
  }
}
interface ReportBlockDto {
  readonly id: string
  readonly reports: readonly ReportDto[]
  readonly show: boolean
}

class Report {
  static fromDto(dto: ReportDto): Report {
    return new Report(dto.key, dto.show)
  }
  static create(key: ReportKey): Report {
    return new Report(key, true)
  }

  constructor(
    readonly key: ReportKey,
    readonly show: boolean,
  ) {}

  statusFor(assembly: Assembly): ReportStatus {
    switch (this.key) {
      case 'enLoad':
      case 'enOutput':
      case 'enSurplus':
      case 'enSupplyEfficiency':
      case 'enRechargeDelay':
        return assembly.withinEnOutput ? 'normal' : 'danger'
      default:
        return 'normal'
    }
  }
}
interface ReportDto {
  readonly key: ReportKey
  readonly show: boolean
}

type ReportKey = Exclude<
  keyof AssemblyProperty,
  'withinEnOutput' | 'withinLoadLimit'
>
