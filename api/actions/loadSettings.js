const initialState = {
  data: {
    aside: {
      companyName: 'ООО "Вымпел"',
      place: 'В Холдинге',
      debts: 41212.00,
      overdue: 41212.00,
      isAlwaysVisible: true
    },
    topMenu: {
      leftItems: [
        {
          title: 'Акции',
          url: '/promotion'
        },
        {
          title: 'Хиты',
          url: '/hits'
        },
        {
          title: 'Новинки',
          url: '/new'
        },
        {
          title: 'Распродажа',
          url: '/sale'
        },
        {
          title: 'Электронные каталоги',
          url: '/catalog'
        }
      ],
      rightItems: [
        {
          title: 'Помощь',
          url: '/help',
          counter: 2
        },
        {
          title: 'Задать вопрос',
          url: '/question'
        }
      ]
    },
    userPanel: {
      reals: 5000,
      countGoal: '16500',
      goodsPromoName: 'ручка роллер «Expert Black GT»',
      userName: 'Константинопольский К.',
      companyName: 'ООО "Вымпел"'
    },
    counterAgentMenuItems: [
      {
        title: 'Общая информация',
        icon: 'iconInfo'
      },
      {
        title: 'Оформление счета',
        icon: 'score'
      },
      {
        title: 'Подписки',
        icon: 'subscribes'
      },
      {
        title: 'Вы часто заказываете',
        icon: 'orders'
      },
      {
        title: 'Заметки',
        icon: 'notices'
      },
      {
        title: 'Сотрудники',
        icon: 'workers'
      },
      {
        title: 'Рассылки',
        icon: 'delivery'
      },
      {
        title: 'Отслеживание',
        icon: 'watch'
      }
    ],
    footer: {
      contents: [
        {
          title: 'Каталоги',
          elements: [
            {
              title: 'Основной каталог'
            },
            {
              title: 'Электронные каталоги'
            },
            {
              title: 'Доставка особого товара'
            }
          ]
        },
        {
          title: 'Клиентам',
          elements: [
            {
              title: 'Программа лояльности'
            },
            {
              title: 'Закладка'
            },
            {
              title: 'Подписки'
            },
            {
              title: 'Новости'
            }
          ]
        },
        {
          title: 'Помощь',
          elements: [
            {
              title: 'Часто задаваемые вопросы'
            }
          ]
        }
      ],
      infoContents: [
        {
          title: 'Рельеф-центр',
          text: 'Товары оптом для офиса, школы и творчества'
        },
        {
          title: '8 (4912) 958 000',
          text: '193019, г. Рязань, ул. Зафабричная, 14 '
        }
      ]
    }
  }
};

export default function loadSettings() {
  return Promise.resolve(initialState);
}
