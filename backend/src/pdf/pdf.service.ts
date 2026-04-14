import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

type PdfDoc = InstanceType<typeof PDFDocument>;

const C = {
  navy: '#1B2B4B',
  gold: '#C9A96E',
  white: '#FFFFFF',
  text: '#1F2937',
  muted: '#6B7280',
  border: '#D7DCE3',
  surface: '#F8FAFC',
  surfaceAlt: '#EEF2F7',
  accent: '#3B5998',
  coverMuted: '#DCE5F2',
};

const FONTS = {
  regular: 'Regular',
  bold: 'Bold',
};

const FONT_REGULAR = path.join(
  process.cwd(),
  'assets',
  'fonts',
  'DejaVuSans.ttf',
);

const FONT_BOLD = path.join(
  process.cwd(),
  'assets',
  'fonts',
  'DejaVuSans-Bold.ttf',
);

const LAYOUT = {
  left: 44,
  right: 44,
  top: 76,
  bottom: 56,
  headerHeight: 54,
  footerY: 808,
  labelWidth: 170,
  rowGap: 6,
  sectionGap: 16,
};

const SECTION_LABELS: Record<string, string> = {
  foundation: 'Фундамент',
  walls: 'Стены',
  floors: 'Полы',
  roof: 'Крыша',
  facade: 'Фасад',
  openings: 'Окна и двери',
  electrical: 'Электрика',
  heating: 'Отопление',
  water: 'Водоснабжение',
  sewer: 'Канализация',
  boiler: 'Котельная',
  interior: 'Внутренняя отделка',
  external: 'Внешние работы',
};

export type FullProject = {
  id: number;
  name: string;
  area: number;
  base_price: number;
  projectImages: { imageUrl: string }[];

  projectFoundations: {
    preparation_description: string;
    foundation_type: string;
    thickness_mm: number;
    description: string;
  }[];

  projectWalls: {
    wallType: string;
    material: string;
    density: string;
    strengthClass: string;
    blockLengthMm: number;
    blockHeightMm: number;
    blockThicknessMm: number;
    description: string;
  }[];

  projectFloors: {
    floorName: string;
    structureType: string;
    insulationMaterial: string;
    insulationThicknessMm: number;
    description: string;
  }[];

  projectRoofs: {
    roofType: string;
    finishMaterial: string;
    description: string;
  }[];

  projectFacades: {
    facadeName: string;
    insulationMaterial: string;
    insulationThicknessMm: number;
    description: string;
  }[];

  projectOpenings: {
    openingType: string;
    zoneName: string;
    profile: string;
    profileWidthMm: number;
    widthMm: number;
    heightMm: number;
    coating: string;
    description: string;
  }[];

  projectElectricalSystems: {
    description: string;
    commitDescription: string;
  }[];

  projectHeatingSystems: {
    systemType: string;
    baseInsulationMaterial: string;
    baseInsulationThicknessMm: number;
    fillingDescription: string;
    description: string;
    commitDescription: string;
  }[];

  projectWaterSupplySystems: {
    systemType: string;
    description: string;
  }[];

  projectSewerSystems: {
    description: string;
  }[];

  projectBoilerRooms: {
    boilerType: string;
    equipmentDescription: string;
    customerEquipmentDescription: string;
    description: string;
  }[];

  projectInteriors: {
    description: string;
  }[];

  projectExternalNetworks: {
    waterSource: string;
    sewer: string;
    landscaping: string;
    description: string;
  }[];
};

type RenderContext = {
  title: string;
};

@Injectable()
export class PdfService {
  generateProjectPdf(project: FullProject): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const ctx: RenderContext = { title: project.name };

      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
        margins: {
          top: LAYOUT.top,
          bottom: LAYOUT.bottom,
          left: LAYOUT.left,
          right: LAYOUT.right,
        },
        info: {
          Title: project.name,
          Author: 'Строительная компания',
          Subject: 'Подробный план проекта',
          Keywords: 'строительство, проект, смета, дом',
        },
      });

      try {
        this.registerFonts(doc);
      } catch (error) {
        console.log(error);
        return;
      }

      let contentMode = false;

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('error', reject);
      doc.on('pageAdded', () => {
        if (!contentMode) return;
        this.drawPageHeader(doc, ctx.title);
        doc.y = LAYOUT.top;
      });
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      this.drawCover(doc, project);

      contentMode = true;
      doc.addPage();

      this.drawSummary(doc, project);
      this.drawSections(doc, project, ctx);
      this.drawFooters(doc);

      doc.end();
    });
  }

  private registerFonts(doc: PdfDoc) {
    if (!fs.existsSync(FONT_REGULAR) || !fs.existsSync(FONT_BOLD)) {
      throw new Error(
        `Не найдены шрифты. Ожидаются файлы:
- ${FONT_REGULAR}
- ${FONT_BOLD}`,
      );
    }

    doc.registerFont(FONTS.regular, FONT_REGULAR);
    doc.registerFont(FONTS.bold, FONT_BOLD);
  }

  private drawCover(doc: PdfDoc, project: FullProject) {
    const W = doc.page.width;
    const H = doc.page.height;

    doc.rect(0, 0, W, H).fill(C.navy);
    doc.rect(0, 0, 10, H).fill(C.gold);

    doc
      .circle(W - 40, 120, 110)
      .fillOpacity(0.05)
      .fill(C.white);
    doc
      .circle(W - 70, H - 100, 180)
      .fillOpacity(0.04)
      .fill(C.white);
    doc.circle(60, 240, 90).fillOpacity(0.03).fill(C.white);
    doc.fillOpacity(1);

    doc
      .font(FONTS.regular)
      .fontSize(11)
      .fillColor(C.gold)
      .text('СТРОИТЕЛЬНЫЙ ПРОЕКТ', 60, 56, {
        characterSpacing: 2.2,
      });

    doc
      .moveTo(60, 82)
      .lineTo(W - 60, 82)
      .lineWidth(0.8)
      .strokeColor(C.gold)
      .strokeOpacity(0.35)
      .stroke();
    doc.strokeOpacity(1);

    doc
      .font(FONTS.bold)
      .fontSize(34)
      .fillColor(C.white)
      .text(this.safe(project.name), 60, 112, {
        width: W - 120,
        lineGap: 6,
      });

    const statsY = doc.y + 28;
    this.drawCoverStatCard(
      doc,
      60,
      statsY,
      200,
      72,
      'ПЛОЩАДЬ',
      `${project.area || 0} м²`,
    );
    this.drawCoverStatCard(
      doc,
      280,
      statsY,
      220,
      72,
      'БАЗОВАЯ СТОИМОСТЬ',
      this.formatPrice(project.base_price),
    );

    const infoY = statsY + 108;

    doc
      .font(FONTS.regular)
      .fontSize(12)
      .fillColor(C.coverMuted)
      .text(
        'Документ содержит конструктивные решения, инженерные системы,\nотделочные работы и основные технические характеристики проекта.',
        60,
        infoY,
        {
          width: W - 140,
          lineGap: 4,
        },
      );

    const bottomY = H - 62;
    doc.rect(0, bottomY, W, 62).fillOpacity(0.18).fill('#000000');
    doc.fillOpacity(1);
  }

  private drawCoverStatCard(
    doc: PdfDoc,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    value: string,
  ) {
    doc.roundedRect(x, y, w, h, 10).fillOpacity(0.12).fill(C.white);
    doc.fillOpacity(1);

    doc
      .font(FONTS.regular)
      .fontSize(9)
      .fillColor(C.gold)
      .text(label, x + 14, y + 14, { characterSpacing: 1.2 });

    doc
      .font(FONTS.bold)
      .fontSize(20)
      .fillColor(C.white)
      .text(value, x + 14, y + 32, {
        width: w - 28,
      });
  }

  private drawPageHeader(doc: PdfDoc, title: string) {
    const W = doc.page.width;

    doc.rect(0, 0, W, LAYOUT.headerHeight).fill(C.navy);
    doc.rect(0, 0, W, 4).fill(C.gold);

    doc
      .font(FONTS.bold)
      .fontSize(12)
      .fillColor(C.white)
      .text(this.safe(title), LAYOUT.left, 20, {
        width: W - LAYOUT.left - LAYOUT.right,
      });
  }

  private drawPageFooter(
    doc: PdfDoc,
    pageNumber: number,
    totalContentPages: number,
  ) {
    const W = doc.page.width;
    const y = doc.page.height - 26;

    const text = `${pageNumber} / ${totalContentPages}`;

    doc.save();

    doc
      .moveTo(LAYOUT.left, y - 8)
      .lineTo(W - LAYOUT.right, y - 8)
      .lineWidth(0.6)
      .strokeColor(C.border)
      .stroke();

    doc.font(FONTS.regular).fontSize(8.5).fillColor(C.muted);

    const textWidth = doc.widthOfString(text);
    doc.text(text, W - LAYOUT.right - textWidth, y, {
      lineBreak: false,
    });

    doc.restore();
  }

  private drawFooters(doc: PdfDoc) {
    const range = doc.bufferedPageRange();
    const totalContentPages = Math.max(range.count - 1, 0);

    if (totalContentPages <= 0) return;

    const lastPageIndex = range.start + range.count - 1;

    for (let i = range.start + 1; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      this.drawPageFooter(doc, i, totalContentPages);
    }

    doc.switchToPage(lastPageIndex);
  }

  private drawSummary(doc: PdfDoc, project: FullProject) {
    const W = doc.page.width;
    const cardY = doc.y;
    const contentWidth = W - LAYOUT.left - LAYOUT.right;
    const gap = 12;
    const cardWidth = (contentWidth - gap) / 2;
    const cardHeight = 66;

    this.drawSummaryCard(
      doc,
      LAYOUT.left,
      cardY,
      cardWidth,
      cardHeight,
      'Площадь',
      `${project.area || 0} м²`,
    );

    this.drawSummaryCard(
      doc,
      LAYOUT.left + cardWidth + gap,
      cardY,
      cardWidth,
      cardHeight,
      'Базовая стоимость',
      this.formatPrice(project.base_price),
    );

    doc.y = cardY + cardHeight + 18;

    doc
      .font(FONTS.regular)
      .fontSize(10)
      .fillColor(C.muted)
      .text(
        'Ниже приведено техническое описание проекта по конструктивным элементам и инженерным системам.',
        LAYOUT.left,
        doc.y,
        {
          width: contentWidth,
        },
      );

    doc.moveDown(1.2);
  }

  private drawSummaryCard(
    doc: PdfDoc,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    value: string,
  ) {
    doc.roundedRect(x, y, w, h, 10).fill(C.surface);
    doc.roundedRect(x, y, w, h, 10).lineWidth(1).strokeColor(C.border).stroke();

    doc
      .font(FONTS.regular)
      .fontSize(9)
      .fillColor(C.muted)
      .text(label.toUpperCase(), x + 14, y + 14, {
        characterSpacing: 0.8,
      });

    doc
      .font(FONTS.bold)
      .fontSize(18)
      .fillColor(C.text)
      .text(value, x + 14, y + 32, {
        width: w - 28,
      });
  }

  private drawSections(doc: PdfDoc, project: FullProject, ctx: RenderContext) {
    this.drawSection(
      doc,
      SECTION_LABELS.foundation,
      project.projectFoundations,
      ctx,
      (foundation, sectionLabel) => {
        this.field(
          doc,
          'Тип фундамента',
          foundation.foundation_type,
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Толщина',
          this.mm(foundation.thickness_mm),
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Подготовка',
          foundation.preparation_description,
          ctx,
          sectionLabel,
        );
        this.paragraph(
          doc,
          'Описание',
          foundation.description,
          ctx,
          sectionLabel,
        );
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.walls,
      project.projectWalls,
      ctx,
      (wall, sectionLabel) => {
        this.field(doc, 'Тип стен', wall.wallType, ctx, sectionLabel);
        this.field(doc, 'Материал', wall.material, ctx, sectionLabel);
        this.field(doc, 'Плотность', wall.density, ctx, sectionLabel);
        this.field(
          doc,
          'Класс прочности',
          wall.strengthClass,
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Размер блока (Д×В×Т)',
          this.size3(
            wall.blockLengthMm,
            wall.blockHeightMm,
            wall.blockThicknessMm,
            'мм',
          ),
          ctx,
          sectionLabel,
        );
        this.paragraph(doc, 'Описание', wall.description, ctx, sectionLabel);
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.floors,
      project.projectFloors,
      ctx,
      (floor, sectionLabel) => {
        this.field(doc, 'Название', floor.floorName, ctx, sectionLabel);
        this.field(
          doc,
          'Тип конструкции',
          floor.structureType,
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Утеплитель',
          floor.insulationMaterial,
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Толщина утеплителя',
          this.mm(floor.insulationThicknessMm),
          ctx,
          sectionLabel,
        );
        this.paragraph(doc, 'Описание', floor.description, ctx, sectionLabel);
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.roof,
      project.projectRoofs,
      ctx,
      (roof, sectionLabel) => {
        this.field(doc, 'Тип кровли', roof.roofType, ctx, sectionLabel);
        this.field(
          doc,
          'Финишный материал',
          roof.finishMaterial,
          ctx,
          sectionLabel,
        );
        this.paragraph(doc, 'Описание', roof.description, ctx, sectionLabel);
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.facade,
      project.projectFacades,
      ctx,
      (facade, sectionLabel) => {
        this.field(
          doc,
          'Название фасада',
          facade.facadeName,
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Утеплитель',
          facade.insulationMaterial,
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Толщина утеплителя',
          this.mm(facade.insulationThicknessMm),
          ctx,
          sectionLabel,
        );
        this.paragraph(doc, 'Описание', facade.description, ctx, sectionLabel);
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.openings,
      project.projectOpenings,
      ctx,
      (opening, sectionLabel) => {
        this.field(doc, 'Тип', opening.openingType, ctx, sectionLabel);
        this.field(doc, 'Зона', opening.zoneName, ctx, sectionLabel);
        this.field(doc, 'Профиль', opening.profile, ctx, sectionLabel);
        this.field(
          doc,
          'Ширина профиля',
          this.mm(opening.profileWidthMm),
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Размер (Ш×В)',
          this.size2(opening.widthMm, opening.heightMm, 'мм'),
          ctx,
          sectionLabel,
        );
        this.field(doc, 'Покрытие', opening.coating, ctx, sectionLabel);
        this.paragraph(doc, 'Описание', opening.description, ctx, sectionLabel);
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.electrical,
      project.projectElectricalSystems,
      ctx,
      (electrical, sectionLabel) => {
        this.paragraph(
          doc,
          'Описание',
          electrical.description,
          ctx,
          sectionLabel,
        );
        this.paragraph(
          doc,
          'Результат',
          electrical.commitDescription,
          ctx,
          sectionLabel,
          true,
        );
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.heating,
      project.projectHeatingSystems,
      ctx,
      (heating, sectionLabel) => {
        this.field(doc, 'Система', heating.systemType, ctx, sectionLabel);
        this.field(
          doc,
          'Утеплитель основания',
          heating.baseInsulationMaterial,
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Толщина утеплителя',
          this.mm(heating.baseInsulationThicknessMm),
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Заливка',
          heating.fillingDescription,
          ctx,
          sectionLabel,
        );
        this.paragraph(doc, 'Описание', heating.description, ctx, sectionLabel);
        this.paragraph(
          doc,
          'Результат',
          heating.commitDescription,
          ctx,
          sectionLabel,
          true,
        );
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.water,
      project.projectWaterSupplySystems,
      ctx,
      (water, sectionLabel) => {
        this.field(doc, 'Тип системы', water.systemType, ctx, sectionLabel);
        this.paragraph(doc, 'Описание', water.description, ctx, sectionLabel);
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.sewer,
      project.projectSewerSystems,
      ctx,
      (sewer, sectionLabel) => {
        this.paragraph(doc, 'Описание', sewer.description, ctx, sectionLabel);
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.boiler,
      project.projectBoilerRooms,
      ctx,
      (boiler, sectionLabel) => {
        this.field(doc, 'Тип котла', boiler.boilerType, ctx, sectionLabel);
        this.field(
          doc,
          'Оборудование',
          boiler.equipmentDescription,
          ctx,
          sectionLabel,
        );
        this.field(
          doc,
          'Оборудование заказчика',
          boiler.customerEquipmentDescription,
          ctx,
          sectionLabel,
        );
        this.paragraph(doc, 'Описание', boiler.description, ctx, sectionLabel);
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.interior,
      project.projectInteriors,
      ctx,
      (interior, sectionLabel) => {
        this.paragraph(
          doc,
          'Описание',
          interior.description,
          ctx,
          sectionLabel,
        );
      },
    );

    this.drawSection(
      doc,
      SECTION_LABELS.external,
      project.projectExternalNetworks,
      ctx,
      (external, sectionLabel) => {
        this.field(
          doc,
          'Водоснабжение',
          external.waterSource,
          ctx,
          sectionLabel,
        );
        this.field(doc, 'Канализация', external.sewer, ctx, sectionLabel);
        this.field(
          doc,
          'Благоустройство',
          external.landscaping,
          ctx,
          sectionLabel,
        );
        this.paragraph(
          doc,
          'Описание',
          external.description,
          ctx,
          sectionLabel,
        );
      },
    );
  }

  private drawSection<T>(
    doc: PdfDoc,
    label: string,
    items: T[] | undefined,
    ctx: RenderContext,
    renderItem: (item: T, sectionLabel: string) => void,
  ) {
    if (!items?.length) return;

    this.ensureSpace(doc, 44, ctx);
    this.drawSectionHeader(doc, label);

    items.forEach((item, index) => {
      this.ensureSpace(doc, 26, ctx, label);

      if (index > 0) {
        this.drawSeparator(doc);
      }

      renderItem(item, label);
      doc.moveDown(0.2);
    });

    doc.moveDown(0.8);
  }

  private drawSectionHeader(doc: PdfDoc, label: string) {
    const W = doc.page.width - LAYOUT.left - LAYOUT.right;
    const x = LAYOUT.left;
    const y = doc.y;

    doc.roundedRect(x, y, W, 30, 8).fill(C.navy);
    doc.rect(x, y, 6, 30).fill(C.gold);

    doc
      .font(FONTS.bold)
      .fontSize(11)
      .fillColor(C.white)
      .text(label.toUpperCase(), x + 16, y + 9, {
        characterSpacing: 0.8,
      });

    doc.y = y + 40;
  }

  private drawSeparator(doc: PdfDoc) {
    const y = doc.y + 2;

    doc
      .moveTo(LAYOUT.left, y)
      .lineTo(doc.page.width - LAYOUT.right, y)
      .lineWidth(0.6)
      .strokeColor(C.border)
      .stroke();

    doc.y = y + 10;
  }

  private ensureSpace(
    doc: PdfDoc,
    neededHeight: number,
    ctx: RenderContext,
    sectionLabel?: string,
  ) {
    const bottomLimit = doc.page.height - doc.page.margins.bottom;

    if (doc.y + neededHeight <= bottomLimit) return;

    doc.addPage();

    if (sectionLabel) {
      this.drawSectionHeader(doc, `${sectionLabel} — продолжение`);
    }
  }

  private field(
    doc: PdfDoc,
    label: string,
    value: unknown,
    ctx: RenderContext,
    sectionLabel: string,
  ) {
    if (!this.hasValue(value)) return;

    const x = LAYOUT.left;
    const labelWidth = LAYOUT.labelWidth;
    const gap = 12;
    const valueWidth = doc.page.width - LAYOUT.right - x - labelWidth - gap;

    const labelText = this.safe(label);
    const valueText = this.safe(value);

    const labelHeight = this.measureText(
      doc,
      labelText,
      FONTS.regular,
      9,
      labelWidth,
    );
    const valueHeight = this.measureText(
      doc,
      valueText,
      FONTS.bold,
      10,
      valueWidth,
    );

    const rowHeight = Math.max(labelHeight, valueHeight, 14);

    this.ensureSpace(doc, rowHeight + LAYOUT.rowGap, ctx, sectionLabel);

    const rowY = doc.y;

    doc
      .font(FONTS.regular)
      .fontSize(9)
      .fillColor(C.muted)
      .text(labelText, x, rowY, {
        width: labelWidth,
      });

    doc
      .font(FONTS.bold)
      .fontSize(10)
      .fillColor(C.text)
      .text(valueText, x + labelWidth + gap, rowY, {
        width: valueWidth,
      });

    doc.y = rowY + rowHeight + LAYOUT.rowGap;
  }

  private paragraph(
    doc: PdfDoc,
    label: string,
    text: unknown,
    ctx: RenderContext,
    sectionLabel: string,
    isAccent = false,
  ) {
    if (!this.hasValue(text)) return;

    this.ensureSpace(doc, 34, ctx, sectionLabel);

    const x = LAYOUT.left;
    const y = doc.y;
    const textX = x + 12;
    const textWidth = doc.page.width - LAYOUT.left - LAYOUT.right - 12;
    const lineColor = isAccent ? C.accent : C.gold;
    const labelColor = isAccent ? C.accent : C.text;

    doc
      .moveTo(x, y + 2)
      .lineTo(x, y + 24)
      .lineWidth(2)
      .strokeColor(lineColor)
      .stroke();

    doc
      .font(FONTS.bold)
      .fontSize(9)
      .fillColor(labelColor)
      .text(label, textX, y);

    doc
      .font(FONTS.regular)
      .fontSize(9.5)
      .fillColor(C.text)
      .text(this.safe(text), textX, y + 14, {
        width: textWidth,
        lineGap: 3,
      });

    doc.moveDown(0.5);
  }

  private measureText(
    doc: PdfDoc,
    text: string,
    fontName: string,
    fontSize: number,
    width: number,
  ): number {
    doc.font(fontName).fontSize(fontSize);
    return doc.heightOfString(text, { width });
  }

  private hasValue(value: unknown): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  }

  private safe(value: unknown): string {
    if (!this.hasValue(value)) return '—';
    return String(value).trim();
  }

  private mm(value: number | null | undefined): string {
    return this.hasValue(value) ? `${value} мм` : '—';
  }

  private size2(
    a: number | null | undefined,
    b: number | null | undefined,
    unit: string,
  ): string {
    if (!this.hasValue(a) || !this.hasValue(b)) return '—';
    return `${a} × ${b} ${unit}`;
  }

  private size3(
    a: number | null | undefined,
    b: number | null | undefined,
    c: number | null | undefined,
    unit: string,
  ): string {
    if (!this.hasValue(a) || !this.hasValue(b) || !this.hasValue(c)) return '—';
    return `${a} × ${b} × ${c} ${unit}`;
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price || 0);
  }
}
