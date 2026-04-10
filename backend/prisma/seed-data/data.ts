export const seedData = {
  project: {
    name: 'ЛОТОС',
    slug: 'lotos',
    basePrice: Math.random() * 10000000 + 8000000, // цена от 8 до 18 млн рублей
  },

  foundation: {
    preparationDescription:
      'Отсыпка и выравнивание участка под пятно застройки с использованием инертных материалов 100 м³. Состав: скальный грунт 85%, ПГС или отсев 15%. Уплотнение до стандартных показателей.',
    foundationType: 'Монолитная железобетонная плита',
    thicknessMm: 300,
  },

  walls: [
    {
      wallType: 'Внешняя стена',
      material: 'Газобетон автоклавный',
      density: 'D600',
      strengthClass: 'B2,5 / B3,5',
      blockLengthMm: 600,
      blockHeightMm: 300,
      blockThicknessMm: 200,
      description: 'Несущие наружные стены',
    },
    {
      wallType: 'Внутренняя стена',
      material: 'Газобетон',
      density: 'D700',
      strengthClass: 'B3,5',
      blockLengthMm: 600,
      blockHeightMm: 300,
      blockThicknessMm: 150,
      description: 'Внутренние стены и перегородки',
    },
  ],

  floors: [
    {
      floorName: 'Перекрытие 1-го этажа',
      structureType: 'Деревянные балки перекрытия',
      insulationMaterial: 'Минеральная вата с паро-гидроизоляцией',
      insulationThicknessMm: 200,
      description: 'Стандартная технология утепления перекрытия',
    },
  ],

  roof: {
    roofType: 'Вальмовая четырехскатная стропильная система',
    finishMaterial: 'Металлочерепица Монтеррей',
    description: 'Гидроизоляция, контробрешетка, обрешетка',
  },

  facade: {
    facadeName: 'Теплоизоляционные металлические панели Ханьи',
    insulationMaterial:
      'Минераловатный материал на основе стекловолокна ECOSE®',
    insulationThicknessMm: 150,
    description:
      'Трехслойные панели: металлический лист, пенополиуретан, фольгированное покрытие',
  },

  openings: [
    {
      openingType: 'window',
      zoneName: 'Жилая комната',
      profile: 'ПВХ',
      profileWidthMm: 70,
      widthMm: 1400,
      heightMm: 1600,
      coating: 'Стеклопакет с ТОП-покрытием',
      description: 'Оконный проем жилой комнаты',
    },
    {
      openingType: 'window',
      zoneName: 'Кухня-гостиная',
      profile: 'ПВХ',
      profileWidthMm: 70,
      widthMm: 1400,
      heightMm: 1600,
      coating: 'Стеклопакет с ТОП-покрытием',
      description: 'Оконный проем кухни-гостиной',
    },
    {
      openingType: 'door',
      zoneName: 'Терраса',
      profile: 'ПВХ',
      profileWidthMm: 70,
      widthMm: 2200,
      heightMm: 2400,
      coating: 'Стеклопакет с ТОП-покрытием',
      description: 'Выход на террасу',
    },
    {
      openingType: 'window',
      zoneName: 'Санузел / техпомещение',
      profile: 'ПВХ',
      profileWidthMm: 70,
      widthMm: 800,
      heightMm: 1600,
      coating: 'Стеклопакет с ТОП-покрытием',
      description: 'Оконный проем технического помещения',
    },
    {
      openingType: 'door',
      zoneName: 'Главный вход',
      profile: 'Временная дверь',
      profileWidthMm: null,
      widthMm: null,
      heightMm: null,
      coating: null,
      description: 'Временная входная дверь на период строительства',
    },
  ],

  images: [
    {
      imageUrl: '/uploads/projects/lotos/main-front.jpg',
    },
    {
      imageUrl: '/uploads/projects/lotos/side-view.jpg',
    },
    {
      imageUrl: '/uploads/projects/lotos/plan.jpg',
    },
  ],

  electrical: {
    description:
      'Штробление стен, прокладка медных кабелей, линии в гофре, монтаж коробок и электрощита',
    commissioningDescription:
      'Проверка на короткое замыкание и правильность подключения',
  },

  heating: {
    systemType: 'Теплый пол',
    baseInsulationMaterial: 'Пенополистирол',
    baseInsulationThicknessMm: 50,
    fillingDescription: 'Армирование сеткой, заливка раствором М150',
    description: 'Монтаж трубопровода теплого пола',
    commitDescription: 'Запуск и проверка работоспособности системы отопления',
  },

  waterSupply: {
    systemType: 'ХВС / ГВС',
    description:
      'Разводка трубопроводов холодного и горячего водоснабжения, монтаж запорной арматуры',
  },

  sewerSystems: [
    {
      description: 'Внутренняя разводка канализационных труб по точкам',
    },
    {
      description:
        'Септик из железобетонных колец стандартного объема для данного дома',
    },
  ],

  boilerRoom: {
    boilerType: 'Электрокотел Zota или аналог',
    equipmentDescription:
      'ТЭНы, контроллер, расширительный бак, насос, группа безопасности, коллекторы теплого пола и ХВС/ГВС',
    customerEquipmentNote:
      'Водонагреватель предоставляет заказчик, монтаж выполняется подрядчиком бесплатно',
  },

  interiorFinish: {
    description:
      'Стены оштукатуриваются гипсовыми смесями.Санузлы оштукатуриваются влагостойкими цементными смесями.Оконные и дверные откосы в объем работ не входят',
  },

  externalNetworks: {
    waterSource:
      'Бурение скважины до 25 метров, обсадка ПНД трубами, прокачка до чистой воды, ввод в техническое помещение дома',
    sewer: 'Устройство септика из железобетонных колец стандартного объема',
    landscaping: 'Базовые работы по подключению наружных сетей к дому',
  },

  quizQuestions: [
    {
      title: 'Какой у вас бюджет на строительство?',
      key: 'budget',
      options: [
        { label: 'До 8 млн рублей', value: 'budget_low', order: 1 },
        { label: '8–12 млн рублей', value: 'budget_medium', order: 2 },
        { label: '12–18 млн рублей', value: 'budget_high', order: 3 },
        { label: 'Более 18 млн рублей', value: 'budget_premium', order: 4 },
      ],
    },
    {
      title: 'Какая площадь дома вас интересует?',
      key: 'area',
      options: [
        { label: 'До 80 м²', value: 'area_small', order: 1 },
        { label: '80–120 м²', value: 'area_medium', order: 2 },
        { label: '120–160 м²', value: 'area_large', order: 3 },
        { label: 'Более 160 м²', value: 'area_xlarge', order: 4 },
      ],
    },
    {
      title: 'Сколько этажей вы хотите?',
      key: 'floors',
      options: [
        { label: 'Одноэтажный', value: 'floors_one', order: 1 },
        { label: 'Двухэтажный', value: 'floors_two', order: 2 },
        { label: 'Не принципиально', value: 'floors_any', order: 3 },
      ],
    },
    {
      title: 'Сколько спален вам нужно?',
      key: 'bedrooms',
      options: [
        { label: '1–2 спальни', value: 'bedrooms_two', order: 1 },
        { label: '3 спальни', value: 'bedrooms_three', order: 2 },
        { label: '4 и более', value: 'bedrooms_four_plus', order: 3 },
      ],
    },
    {
      title: 'Какой тип крыши вы предпочитаете?',
      key: 'roof',
      options: [
        { label: 'Двускатная', value: 'roof_gable', order: 1 },
        { label: 'Вальмовая', value: 'roof_hip', order: 2 },
        { label: 'Плоская', value: 'roof_flat', order: 3 },
        { label: 'Любая', value: 'roof_any', order: 4 },
      ],
    },
    {
      title: 'На каком этапе принятия решения вы находитесь?',
      key: 'decision_stage',
      options: [
        { label: 'Просто смотрю варианты', value: 'stage_exploring', order: 1 },
        { label: 'Готов начать в этом году', value: 'stage_this_year', order: 2 },
        { label: 'Готов начать в ближайшие 3 месяца', value: 'stage_soon', order: 3 },
      ],
    },
  ],
};
