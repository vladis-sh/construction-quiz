export const seedData = {
  project: {
    name: 'ЛОТОС',
    slug: 'lotos',
    basePrice: Math.random() * 10000000 + 8000000, // цена от 8 до 18 млн рублей
    area: 75,
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

  images: [{ imageUrl: '/images/projects/project_1.png' }],

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
        {
          label: 'Готов начать в этом году',
          value: 'stage_this_year',
          order: 2,
        },
        {
          label: 'Готов начать в ближайшие 3 месяца',
          value: 'stage_soon',
          order: 3,
        },
      ],
    },
  ],
};

export const additionalProjectsData = [
  {
    project: { name: 'ТЭСС – 80', slug: 'tess-80', base_price: 10350000, area: 80 },
    foundation: {
      preparationDescription:
        'Отсыпка и выравнивание участка 80 м³. Состав: скальный грунт 80%, ПГС 20%. Уплотнение до стандартных показателей.',
      foundationType: 'Монолитная железобетонная плита',
      thicknessMm: 250,
    },
    walls: [
      {
        wallType: 'Внешняя стена',
        material: 'Газобетон автоклавный',
        density: 'D500',
        strengthClass: 'B2,5',
        blockLengthMm: 600,
        blockHeightMm: 300,
        blockThicknessMm: 200,
        description: 'Несущие наружные стены',
      },
      {
        wallType: 'Внутренняя стена',
        material: 'Газобетон',
        density: 'D600',
        strengthClass: 'B3,5',
        blockLengthMm: 600,
        blockHeightMm: 300,
        blockThicknessMm: 100,
        description: 'Внутренние перегородки',
      },
    ],
    floors: [
      {
        floorName: 'Перекрытие 1-го этажа',
        structureType: 'Деревянные балки перекрытия',
        insulationMaterial: 'Минеральная вата с паро-гидроизоляцией',
        insulationThicknessMm: 200,
        description: 'Стандартное утепление перекрытия',
      },
    ],
    roof: {
      roofType: 'Двускатная стропильная система',
      finishMaterial: 'Металлочерепица Монтеррей',
      description: 'Гидроизоляция, контробрешетка, обрешетка',
    },
    facade: {
      facadeName: 'Штукатурный фасад с утеплением',
      insulationMaterial: 'Минеральная вата',
      insulationThicknessMm: 100,
      description: 'Базовый штукатурный фасад с минватой',
    },
    openings: [
      {
        openingType: 'window',
        zoneName: 'Жилая комната',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1200,
        heightMm: 1400,
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
        description: 'Оконный проем кухни',
      },
      {
        openingType: 'door',
        zoneName: 'Главный вход',
        profile: 'Временная дверь',
        profileWidthMm: null,
        widthMm: null,
        heightMm: null,
        coating: null,
        description: 'Временная входная дверь',
      },
    ],
    images: [{ imageUrl: '/images/projects/project_2.jpg' }],
    electrical: {
      description:
        'Штробление стен, прокладка медных кабелей, монтаж электрощита',
      commissioningDescription:
        'Проверка на короткое замыкание и правильность подключения',
    },
    heating: {
      systemType: 'Теплый пол',
      baseInsulationMaterial: 'Пенополистирол',
      baseInsulationThicknessMm: 50,
      fillingDescription: 'Армирование сеткой, заливка М150',
      description: 'Монтаж трубопровода теплого пола',
      commitDescription: 'Запуск и проверка системы',
    },
    waterSupply: {
      systemType: 'ХВС / ГВС',
      description: 'Разводка трубопроводов ХВС и ГВС, монтаж запорной арматуры',
    },
    sewerSystems: [
      { description: 'Внутренняя разводка канализации' },
      { description: 'Септик из железобетонных колец' },
    ],
    boilerRoom: {
      boilerType: 'Электрокотел Zota или аналог',
      equipmentDescription:
        'ТЭНы, контроллер, расширительный бак, насос, группа безопасности',
      customerEquipmentNote: 'Водонагреватель предоставляет заказчик',
    },
    interiorFinish: {
      description:
        'Стены оштукатуриваются гипсовыми смесями. Санузлы — влагостойкими смесями.',
    },
    externalNetworks: {
      waterSource: 'Бурение скважины до 25 м, ввод в дом',
      sewer: 'Септик из ЖБ колец',
      landscaping: 'Базовое подключение наружных сетей',
    },
  },
  {
    project: { name: 'ОРИОН – 83', slug: 'orion-83', base_price: 10760000, area: 83 },
    foundation: {
      preparationDescription:
        'Отсыпка и выравнивание участка 85 м³. Скальный грунт 80%, ПГС 20%. Уплотнение виброплитой.',
      foundationType: 'Монолитная железобетонная плита',
      thicknessMm: 250,
    },
    walls: [
      {
        wallType: 'Внешняя стена',
        material: 'Газобетон автоклавный',
        density: 'D500',
        strengthClass: 'B2,5',
        blockLengthMm: 600,
        blockHeightMm: 300,
        blockThicknessMm: 200,
        description: 'Несущие наружные стены',
      },
      {
        wallType: 'Внутренняя стена',
        material: 'Газобетон',
        density: 'D600',
        strengthClass: 'B3,5',
        blockLengthMm: 600,
        blockHeightMm: 300,
        blockThicknessMm: 150,
        description: 'Внутренние перегородки',
      },
    ],
    floors: [
      {
        floorName: 'Перекрытие 1-го этажа',
        structureType: 'Деревянные балки перекрытия',
        insulationMaterial: 'Минеральная вата',
        insulationThicknessMm: 200,
        description: 'Утепление перекрытия',
      },
    ],
    roof: {
      roofType: 'Двускатная стропильная система',
      finishMaterial: 'Металлочерепица Монтеррей',
      description: 'Гидроизоляция, контробрешетка, обрешетка',
    },
    facade: {
      facadeName: 'Штукатурный фасад с утеплением',
      insulationMaterial: 'Минеральная вата',
      insulationThicknessMm: 100,
      description: 'Штукатурный фасад',
    },
    openings: [
      {
        openingType: 'window',
        zoneName: 'Жилая комната',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1200,
        heightMm: 1400,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Оконный проем',
      },
      {
        openingType: 'window',
        zoneName: 'Кухня-гостиная',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1400,
        heightMm: 1600,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Кухня',
      },
      {
        openingType: 'door',
        zoneName: 'Терраса',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 2000,
        heightMm: 2200,
        coating: 'Стеклопакет',
        description: 'Выход на террасу',
      },
      {
        openingType: 'door',
        zoneName: 'Главный вход',
        profile: 'Временная дверь',
        profileWidthMm: null,
        widthMm: null,
        heightMm: null,
        coating: null,
        description: 'Временная входная дверь',
      },
    ],
    images: [{ imageUrl: '/images/projects/project_3.png' }],
    electrical: {
      description:
        'Штробление стен, прокладка медных кабелей, монтаж электрощита',
      commissioningDescription:
        'Проверка подключений и замер сопротивления изоляции',
    },
    heating: {
      systemType: 'Теплый пол',
      baseInsulationMaterial: 'Пенополистирол',
      baseInsulationThicknessMm: 50,
      fillingDescription: 'Армирование сеткой, заливка М150',
      description: 'Монтаж теплого пола',
      commitDescription: 'Запуск и проверка',
    },
    waterSupply: {
      systemType: 'ХВС / ГВС',
      description: 'Разводка трубопроводов ХВС/ГВС, запорная арматура',
    },
    sewerSystems: [
      { description: 'Внутренняя разводка канализации' },
      { description: 'Септик из ЖБ колец' },
    ],
    boilerRoom: {
      boilerType: 'Электрокотел Zota или аналог',
      equipmentDescription: 'ТЭНы, контроллер, бак, насос, коллекторы',
      customerEquipmentNote: 'Водонагреватель предоставляет заказчик',
    },
    interiorFinish: {
      description: 'Стены — гипсовая штукатурка. Санузлы — влагостойкая смесь.',
    },
    externalNetworks: {
      waterSource: 'Скважина до 25 м',
      sewer: 'Септик ЖБ',
      landscaping: 'Подключение наружных сетей',
    },
  },
  {
    project: { name: 'АЛЬФА – 95', slug: 'alfa-95', base_price: 12100000, area: 95 },
    foundation: {
      preparationDescription:
        'Отсыпка 100 м³, скальный грунт 85%, ПГС 15%. Уплотнение до проектных значений.',
      foundationType: 'Монолитная железобетонная плита',
      thicknessMm: 300,
    },
    walls: [
      {
        wallType: 'Внешняя стена',
        material: 'Газобетон автоклавный',
        density: 'D600',
        strengthClass: 'B3,5',
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
        description: 'Перегородки',
      },
    ],
    floors: [
      {
        floorName: 'Перекрытие 1-го этажа',
        structureType: 'Деревянные балки перекрытия',
        insulationMaterial: 'Минеральная вата с паро-гидроизоляцией',
        insulationThicknessMm: 200,
        description: 'Утепление перекрытия',
      },
    ],
    roof: {
      roofType: 'Вальмовая четырехскатная стропильная система',
      finishMaterial: 'Металлочерепица Монтеррей',
      description: 'Гидроизоляция, контробрешетка, обрешетка',
    },
    facade: {
      facadeName: 'Теплоизоляционные панели',
      insulationMaterial: 'Минеральная вата ECOSE®',
      insulationThicknessMm: 150,
      description: 'Трехслойные панели с утеплением',
    },
    openings: [
      {
        openingType: 'window',
        zoneName: 'Жилая комната 1',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1400,
        heightMm: 1600,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Спальня 1',
      },
      {
        openingType: 'window',
        zoneName: 'Жилая комната 2',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1400,
        heightMm: 1600,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Спальня 2',
      },
      {
        openingType: 'window',
        zoneName: 'Кухня-гостиная',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1600,
        heightMm: 1800,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Кухня-гостиная',
      },
      {
        openingType: 'door',
        zoneName: 'Терраса',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 2200,
        heightMm: 2400,
        coating: 'Стеклопакет',
        description: 'Выход на террасу',
      },
      {
        openingType: 'door',
        zoneName: 'Главный вход',
        profile: 'Временная дверь',
        profileWidthMm: null,
        widthMm: null,
        heightMm: null,
        coating: null,
        description: 'Временная входная дверь',
      },
    ],
    images: [{ imageUrl: '/images/projects/project_4.png' }],
    electrical: {
      description:
        'Штробление, медный кабель в гофре, электрощит, розетки и выключатели',
      commissioningDescription: 'Замер сопротивления, проверка УЗО',
    },
    heating: {
      systemType: 'Теплый пол',
      baseInsulationMaterial: 'Пенополистирол',
      baseInsulationThicknessMm: 50,
      fillingDescription: 'Армирование сеткой, заливка М200',
      description: 'Теплый пол по всей площади',
      commitDescription: 'Гидравлическое испытание и запуск',
    },
    waterSupply: {
      systemType: 'ХВС / ГВС',
      description: 'Полная разводка ХВС/ГВС с коллекторной схемой',
    },
    sewerSystems: [
      { description: 'Внутренняя разводка по точкам' },
      { description: 'Септик ЖБ увеличенного объема' },
    ],
    boilerRoom: {
      boilerType: 'Электрокотел Zota или аналог',
      equipmentDescription:
        'ТЭНы, контроллер, бак, насос, группа безопасности, коллекторы',
      customerEquipmentNote: 'Водонагреватель — заказчик, монтаж бесплатно',
    },
    interiorFinish: {
      description: 'Гипсовая штукатурка стен, влагостойкая смесь в санузлах.',
    },
    externalNetworks: {
      waterSource: 'Скважина до 25 м, ввод в техпомещение',
      sewer: 'Септик из ЖБ колец',
      landscaping: 'Базовое подключение сетей',
    },
  },
  {
    project: { name: 'СИРИУС – 110', slug: 'sirius-110', base_price: 14500000, area: 110 },
    foundation: {
      preparationDescription:
        'Отсыпка 120 м³, скальный грунт 85%, ПГС 15%. Уплотнение виброкатком.',
      foundationType: 'Монолитная железобетонная плита усиленная',
      thicknessMm: 350,
    },
    walls: [
      {
        wallType: 'Внешняя стена',
        material: 'Газобетон автоклавный',
        density: 'D600',
        strengthClass: 'B3,5',
        blockLengthMm: 600,
        blockHeightMm: 300,
        blockThicknessMm: 250,
        description: 'Несущие наружные стены',
      },
      {
        wallType: 'Внутренняя стена',
        material: 'Газобетон',
        density: 'D700',
        strengthClass: 'B3,5',
        blockLengthMm: 600,
        blockHeightMm: 300,
        blockThicknessMm: 200,
        description: 'Несущие внутренние стены',
      },
    ],
    floors: [
      {
        floorName: 'Перекрытие 1-го этажа',
        structureType: 'Монолитное железобетонное перекрытие',
        insulationMaterial: 'Пенополистирол',
        insulationThicknessMm: 100,
        description: 'Железобетонное межэтажное перекрытие',
      },
      {
        floorName: 'Перекрытие 2-го этажа',
        structureType: 'Деревянные балки',
        insulationMaterial: 'Минеральная вата',
        insulationThicknessMm: 200,
        description: 'Утепление чердачного перекрытия',
      },
    ],
    roof: {
      roofType: 'Вальмовая четырехскатная стропильная система',
      finishMaterial: 'Металлочерепица Монтеррей',
      description: 'Усиленная стропильная система с гидроизоляцией',
    },
    facade: {
      facadeName: 'Теплоизоляционные металлические панели Ханьи',
      insulationMaterial: 'Минеральная вата ECOSE®',
      insulationThicknessMm: 150,
      description: 'Трехслойные панели премиум-класса',
    },
    openings: [
      {
        openingType: 'window',
        zoneName: 'Спальня 1',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1400,
        heightMm: 1600,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Спальня 1',
      },
      {
        openingType: 'window',
        zoneName: 'Спальня 2',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1400,
        heightMm: 1600,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Спальня 2',
      },
      {
        openingType: 'window',
        zoneName: 'Спальня 3',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1200,
        heightMm: 1400,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Спальня 3',
      },
      {
        openingType: 'window',
        zoneName: 'Кухня-гостиная',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1800,
        heightMm: 2000,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Кухня-гостиная',
      },
      {
        openingType: 'door',
        zoneName: 'Терраса',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 2400,
        heightMm: 2400,
        coating: 'Стеклопакет',
        description: 'Выход на террасу',
      },
      {
        openingType: 'door',
        zoneName: 'Главный вход',
        profile: 'Временная дверь',
        profileWidthMm: null,
        widthMm: null,
        heightMm: null,
        coating: null,
        description: 'Временная входная дверь',
      },
    ],
    images: [{ imageUrl: '/images/projects/project_5.jpg' }],
    electrical: {
      description: 'Полная электрика двухэтажного дома, щиты на каждом этаже',
      commissioningDescription: 'Полная проверка и замеры',
    },
    heating: {
      systemType: 'Теплый пол + радиаторы',
      baseInsulationMaterial: 'Пенополистирол',
      baseInsulationThicknessMm: 50,
      fillingDescription: 'Армирование, заливка М200',
      description: 'Теплый пол 1 этаж + радиаторы 2 этаж',
      commitDescription: 'Балансировка и запуск системы',
    },
    waterSupply: {
      systemType: 'ХВС / ГВС',
      description: 'Коллекторная схема разводки ХВС/ГВС на два этажа',
    },
    sewerSystems: [
      { description: 'Полная разводка канализации на двух этажах' },
      { description: 'Септик из ЖБ колец увеличенного объема' },
    ],
    boilerRoom: {
      boilerType: 'Газовый котел или электрокотел Zota',
      equipmentDescription:
        'Котел, бак, насос, группа безопасности, коллекторы всех контуров',
      customerEquipmentNote: 'Водонагреватель предоставляет заказчик',
    },
    interiorFinish: {
      description:
        'Гипсовая штукатурка стен на обоих этажах. Санузлы — влагостойкая смесь.',
    },
    externalNetworks: {
      waterSource: 'Скважина до 30 м, ввод в дом',
      sewer: 'Септик повышенного объема',
      landscaping: 'Подключение всех наружных сетей',
    },
  },
  {
    project: { name: 'АВРОРА – 130', slug: 'avrora-130', base_price: 16800000, area: 130 },
    foundation: {
      preparationDescription:
        'Отсыпка 150 м³, скальный грунт 85%, ПГС 15%. Уплотнение виброкатком до проектных значений.',
      foundationType: 'Монолитная железобетонная плита усиленная',
      thicknessMm: 400,
    },
    walls: [
      {
        wallType: 'Внешняя стена',
        material: 'Газобетон автоклавный',
        density: 'D600',
        strengthClass: 'B3,5 / B5',
        blockLengthMm: 600,
        blockHeightMm: 300,
        blockThicknessMm: 300,
        description: 'Утолщённые несущие стены',
      },
      {
        wallType: 'Внутренняя стена',
        material: 'Газобетон',
        density: 'D700',
        strengthClass: 'B5',
        blockLengthMm: 600,
        blockHeightMm: 300,
        blockThicknessMm: 200,
        description: 'Несущие внутренние стены',
      },
    ],
    floors: [
      {
        floorName: 'Перекрытие 1-го этажа',
        structureType: 'Монолитное железобетонное перекрытие',
        insulationMaterial: 'Пенополистирол',
        insulationThicknessMm: 150,
        description: 'МЖП с полным утеплением',
      },
      {
        floorName: 'Перекрытие 2-го этажа',
        structureType: 'Деревянные балки',
        insulationMaterial: 'Минеральная вата с паро-гидроизоляцией',
        insulationThicknessMm: 200,
        description: 'Утепленное чердачное перекрытие',
      },
    ],
    roof: {
      roofType: 'Вальмовая четырехскатная стропильная система',
      finishMaterial: 'Натуральная черепица или металлочерепица премиум',
      description:
        'Усиленная стропильная система, вентилируемый подкровельный слой',
    },
    facade: {
      facadeName: 'Вентилируемый фасад с облицовкой',
      insulationMaterial: 'Минеральная вата ECOSE® 200 мм',
      insulationThicknessMm: 200,
      description: 'Вентфасад с финишной облицовкой под кирпич',
    },
    openings: [
      {
        openingType: 'window',
        zoneName: 'Спальня 1',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1600,
        heightMm: 1800,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Главная спальня',
      },
      {
        openingType: 'window',
        zoneName: 'Спальня 2',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1400,
        heightMm: 1600,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Спальня 2',
      },
      {
        openingType: 'window',
        zoneName: 'Спальня 3',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1400,
        heightMm: 1600,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Спальня 3',
      },
      {
        openingType: 'window',
        zoneName: 'Кабинет',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 1200,
        heightMm: 1400,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Кабинет',
      },
      {
        openingType: 'window',
        zoneName: 'Кухня-гостиная',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 2000,
        heightMm: 2200,
        coating: 'Стеклопакет с ТОП-покрытием',
        description: 'Панорамная кухня-гостиная',
      },
      {
        openingType: 'door',
        zoneName: 'Терраса',
        profile: 'ПВХ',
        profileWidthMm: 70,
        widthMm: 2600,
        heightMm: 2400,
        coating: 'Стеклопакет',
        description: 'Большой выход на террасу',
      },
      {
        openingType: 'door',
        zoneName: 'Главный вход',
        profile: 'Временная дверь',
        profileWidthMm: null,
        widthMm: null,
        heightMm: null,
        coating: null,
        description: 'Временная входная дверь',
      },
    ],
    images: [{ imageUrl: '/images/projects/project_6.jpg' }],
    electrical: {
      description:
        'Полная электрика двухэтажного дома, умная система управления, щиты на каждом этаже',
      commissioningDescription: 'Полная проверка, замеры, тестирование системы',
    },
    heating: {
      systemType: 'Теплый пол + радиаторы',
      baseInsulationMaterial: 'Пенополистирол',
      baseInsulationThicknessMm: 50,
      fillingDescription: 'Армирование, заливка М250',
      description: 'Теплый пол на 1 этаже + радиаторное отопление 2 этажа',
      commitDescription: 'Балансировка, запуск, опрессовка',
    },
    waterSupply: {
      systemType: 'ХВС / ГВС',
      description: 'Коллекторная разводка ХВС/ГВС, фильтры грубой очистки',
    },
    sewerSystems: [
      { description: 'Полная разводка на двух этажах' },
      { description: 'Септик большого объема с биофильтрацией' },
    ],
    boilerRoom: {
      boilerType: 'Газовый котел премиум-класса',
      equipmentDescription:
        'Котел, бойлер, насос, группа безопасности, коллекторный шкаф',
      customerEquipmentNote: 'Оборудование подбирается совместно с заказчиком',
    },
    interiorFinish: {
      description:
        'Гипсовая штукатурка во всех помещениях. Санузлы — влагостойкая смесь. Оконные откосы включены.',
    },
    externalNetworks: {
      waterSource: 'Скважина до 40 м с фильтрацией',
      sewer: 'Септик с биофильтрацией',
      landscaping: 'Полное подключение наружных сетей и благоустройство',
    },
  },
];
