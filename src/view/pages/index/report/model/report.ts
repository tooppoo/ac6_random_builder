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

  get allBlocks(): readonly ReportBlock[] {
    return this._blocks
  }
  get blocks(): readonly ReadonlyReportBlock[] {
    return this.allBlocks.filter(b => b.someRecordsVisible)
  }

  updateReport(blockId: ReportBlockId, report: ReadonlyReport): ReportAggregation {
    const indexOfBlock = this._blocks.findIndex(b => b.id === blockId)
    if (indexOfBlock === -1) return this

    const block = this._blocks[indexOfBlock]
    const indexOfReport = block.indexOf(report)
    if (indexOfReport === -1) return this

    return new ReportAggregation(this._blocks.toSpliced(indexOfBlock, 1, block.replaceAt(indexOfReport, report)))
  }

  showAll(): ReportAggregation {
    return new ReportAggregation(
      this.allBlocks.map(b => b.showAll())
    )
  }
}

export type ReportStatus = 'danger' | 'warning' | 'normal'
export type ReportBlockId = string

type ReadonlyReportBlock = ReportBlock
type ReadonlyReport = Report

export class ReportBlock {
  static create(reports: Report[]): ReportBlock {
    return new ReportBlock(crypto.randomUUID(), reports)
  }
  static fromDto(dto: ReportBlockDto): ReportBlock {
    return new ReportBlock(dto.id, dto.reports.map(Report.fromDto))
  }

  private constructor(
    readonly id: ReportBlockId,
    private readonly _reports: readonly Report[],
  ) {}

  get allReports(): readonly Report[] {
    return this._reports
  }
  get reports(): readonly ReadonlyReport[] {
    return this.allReports.filter(r => r.show)
  }
  get someRecordsVisible(): boolean {
    return this.allReports.some(r => r.show)
  }

  indexOf(target: Report): number {
    return this._reports.findIndex(r => r.key === target.key)
  }
  replaceAt(index: number, target: Report): ReportBlock {
    return new ReportBlock(
      this.id,
      this._reports.toSpliced(index, 1, target),
    )
  }
  showAll(): ReportBlock {
    return new ReportBlock(
      this.id,
      this._reports.map(r => r.forceShow())
    )
  }
}
interface ReportBlockDto {
  readonly id: ReportBlockId
  readonly reports: readonly ReportDto[]
}

export class Report {
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

  toggleShow(): Report {
    return new Report(
      this.key,
      !this.show
    )
  }
  forceShow(): Report {
    return new Report(
      this.key,
      true
    )
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
