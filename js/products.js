/* ============================================================
   ХлебМясо — каталог товаров
   Как добавить товар: скопируй любую строку и поменяй поля.
   id     — уникальный код (не повторять!)
   cat    — id категории из CATEGORIES
   price  — цена числом, без пробелов
   unit   — 'кг' | 'шт' | '100 г' | 'уп' | 'л'
   badge  — 'хит' | 'новинка' | 'акция' | '' (пусто — без плашки)
   ============================================================ */

const CATEGORIES = [
  { id: 'bakery',    name: 'Хлеб и выпечка',        icon: '🥖', photo: 'assets/bakery-shelf.jpg' },
  { id: 'meat',      name: 'Мясо',                  icon: '🥩', photo: 'assets/meat-counter.jpg' },
  { id: 'sausage',   name: 'Колбасы и деликатесы',  icon: '🌭', photo: 'assets/sujuk.jpg' },
  { id: 'cheese',    name: 'Сыры и молочное',       icon: '🧀', photo: 'assets/cheese.jpg' },
  { id: 'semi',      name: 'Полуфабрикаты',         icon: '🍲', photo: 'assets/counter.jpg' },
  { id: 'dumplings', name: 'Хинкал и пельмени',     icon: '🥟', photo: 'assets/dumplings.jpg' },
  { id: 'steak',     name: 'Стейки и гриль',        icon: '🔥', photo: 'assets/steak.jpg' },
  { id: 'salads',    name: 'Салаты и закуски',      icon: '🥗', photo: '' },
  { id: 'sandwich',  name: 'Сэндвичи и шаурма',     icon: '🥪', photo: 'assets/lavash.jpg' },
  { id: 'honey',     name: 'Мёд, урбеч и сладости', icon: '🍯', photo: 'assets/urbech.jpg' },
  { id: 'spices',    name: 'Пряности и приправы',   icon: '🧂', photo: '' },
  { id: 'sauces',    name: 'Соусы и заправки',      icon: '🫙', photo: '' },
  { id: 'nuts',      name: 'Орехи и сухофрукты',    icon: '🥜', photo: 'assets/nuts.jpg' },
  { id: 'veg',       name: 'Овощи и фрукты',        icon: '🍅', photo: '' },
  { id: 'snacks',    name: 'Снеки и напитки',       icon: '🥤', photo: 'assets/chakchak.jpg' }
];

const PRODUCTS = [
  /* ---------- ХЛЕБ И ВЫПЕЧКА ---------- */
  { id:'b01', cat:'bakery', name:'Хлеб белый подовый',        desc:'Своя печь, каждое утро свежий',       price:45,  unit:'шт',   emoji:'🍞', badge:'хит',     img:'assets/bread.jpg', tags:'хлеб булка белый' },
  { id:'b02', cat:'bakery', name:'Хлеб ржаной «Дарницкий»',   desc:'Плотный мякиш, хрустящая корка',      price:55,  unit:'шт',   emoji:'🍞', badge:'',        img:'assets/bakery-shelf.jpg', tags:'хлеб ржаной чёрный' },
  { id:'b03', cat:'bakery', name:'Тандырный чурек',           desc:'Печём в тандыре на дровах',           price:70,  unit:'шт',   emoji:'🫓', badge:'хит',     img:'assets/lavash.jpg', tags:'лаваш тандыр чурек лепёшка' },
  { id:'b04', cat:'bakery', name:'Лаваш тонкий',              desc:'Упаковка 4 листа',                     price:60,  unit:'уп',   emoji:'🫓', badge:'',        tags:'лаваш тонкий' },
  { id:'b05', cat:'bakery', name:'Чуду с мясом',              desc:'Тонкое тесто, сочная начинка',        price:120, unit:'шт',   emoji:'🥧', badge:'хит',     img:'assets/chudu.jpg', tags:'чуду мясо пирог дагестан' },
  { id:'b06', cat:'bakery', name:'Чуду с творогом и зеленью', desc:'Классика по-дагестански',             price:110, unit:'шт',   emoji:'🥧', badge:'',        tags:'чуду творог зелень' },
  { id:'b07', cat:'bakery', name:'Чуду с картошкой',          desc:'С топлёным маслом',                   price:100, unit:'шт',   emoji:'🥧', badge:'',        tags:'чуду картошка' },
  { id:'b08', cat:'bakery', name:'Самса с мясом',             desc:'Слоёное тесто, из тандыра',           price:130, unit:'шт',   emoji:'🥟', badge:'',        tags:'самса мясо выпечка' },
  { id:'b09', cat:'bakery', name:'Хачапури по-аджарски',      desc:'Лодочка с сыром и яйцом',             price:290, unit:'шт',   emoji:'🥐', badge:'новинка', tags:'хачапури сыр аджарский' },
  { id:'b10', cat:'bakery', name:'Круассан со сливочным маслом', desc:'82,5% масла в тесте',              price:95,  unit:'шт',   emoji:'🥐', badge:'',        tags:'круассан выпечка завтрак' },
  { id:'b11', cat:'bakery', name:'Булочка с корицей',         desc:'Синнабон-стайл, с глазурью',          price:110, unit:'шт',   emoji:'🧁', badge:'',        tags:'булочка корица синнабон' },
  { id:'b12', cat:'bakery', name:'Пирожки жареные (5 шт)',    desc:'С картошкой / мясом / капустой',      price:250, unit:'уп',   emoji:'🥟', badge:'',        tags:'пирожки жареные' },
  { id:'b13', cat:'bakery', name:'Урбеч-рулет',               desc:'С абрикосовым урбечом',               price:180, unit:'шт',   emoji:'🍥', badge:'новинка', tags:'урбеч рулет десерт' },
  { id:'b14', cat:'bakery', name:'Багет французский',         desc:'Хрустящая корочка, 300 г',            price:85,  unit:'шт',   emoji:'🥖', badge:'',        tags:'багет французский хлеб' },

  { id:'b15', cat:'bakery', name:'Симит (бублик с кунжутом)', desc:'Хрустящий, весь в кунжуте',        price:60,  unit:'шт',   emoji:'🥯', badge:'хит',     img:'assets/simit.jpg', tags:'симит бублик кунжут выпечка' },

  /* ---------- МЯСО ---------- */
  { id:'m01', cat:'meat', name:'Баранина, задняя часть',      desc:'Халяль, охлаждённая',                 price:890, unit:'кг', emoji:'🐑', badge:'хит',     img:'assets/meat-counter.jpg', tags:'баранина халяль мясо задняя' },
  { id:'m02', cat:'meat', name:'Баранина, корейка на кости',  desc:'Идеально для шашлыка и гриля',        price:1050,unit:'кг', emoji:'🐑', badge:'',        tags:'баранина корейка каре' },
  { id:'m03', cat:'meat', name:'Баранья лопатка',             desc:'Для тушения и плова',                 price:790, unit:'кг', emoji:'🐑', badge:'',        tags:'баранина лопатка' },
  { id:'m04', cat:'meat', name:'Говядина, вырезка',           desc:'Мраморность, зачищенная',             price:1490,unit:'кг', emoji:'🥩', badge:'хит',     img:'assets/meat-2.jpg', tags:'говядина вырезка премиум' },
  { id:'m05', cat:'meat', name:'Говядина, лопатка',           desc:'Для гуляша и бульона',                price:720, unit:'кг', emoji:'🥩', badge:'',        img:'assets/meat-3.jpg', tags:'говядина лопатка гуляш' },
  { id:'m06', cat:'meat', name:'Говяжьи рёбра',               desc:'Отлично для хинкала и супа',          price:650, unit:'кг', emoji:'🥩', badge:'',        img:'assets/counter.jpg', tags:'говядина рёбра рёбрышки' },
  { id:'m07', cat:'meat', name:'Телятина, шея',               desc:'Молодое нежное мясо',                 price:980, unit:'кг', emoji:'🥩', badge:'',        tags:'телятина шея' },
  { id:'m08', cat:'meat', name:'Курица домашняя (тушка)',     desc:'Фермерская, ~1,8 кг',                 price:420, unit:'кг', emoji:'🍗', badge:'',        tags:'курица тушка домашняя фермерская' },
  { id:'m09', cat:'meat', name:'Куриное филе',                desc:'Охлаждённое, без кожи',               price:450, unit:'кг', emoji:'🍗', badge:'',        tags:'курица филе грудка' },
  { id:'m10', cat:'meat', name:'Куриные бёдра',               desc:'Сочные, для духовки и гриля',         price:340, unit:'кг', emoji:'🍗', badge:'акция',   tags:'курица бёдра окорочка' },
  { id:'m11', cat:'meat', name:'Индейка, филе бедра',         desc:'Диетическое, охлаждённое',            price:620, unit:'кг', emoji:'🦃', badge:'',        tags:'индейка филе бедро' },
  { id:'m12', cat:'meat', name:'Фарш домашний (говядина+баранина)', desc:'Крутим при вас',                price:690, unit:'кг', emoji:'🥩', badge:'хит',     tags:'фарш домашний говядина баранина' },
  { id:'m13', cat:'meat', name:'Печень говяжья',              desc:'Свежая, охлаждённая',                 price:380, unit:'кг', emoji:'🫀', badge:'',        tags:'печень субпродукты' },
  { id:'m14', cat:'meat', name:'Язык говяжий',                desc:'Для холодных закусок',                price:1290,unit:'кг', emoji:'🫀', badge:'',        tags:'язык субпродукты деликатес' },

  /* ---------- КОЛБАСЫ И ДЕЛИКАТЕСЫ ---------- */
  { id:'s01', cat:'sausage', name:'Колбаса сыровяленая говяжья', desc:'Своё производство, халяль',        price:1490,unit:'кг', emoji:'🌭', badge:'хит',     tags:'колбаса сыровяленая говяжья халяль' },
  { id:'s02', cat:'sausage', name:'Колбаса варёная «Докторская»', desc:'По ГОСТ, без сои',                price:690, unit:'кг', emoji:'🌭', badge:'',        tags:'колбаса варёная докторская' },
  { id:'s03', cat:'sausage', name:'Салями с перцем',            desc:'Пикантная, нарезка',                price:1290,unit:'кг', emoji:'🌭', badge:'',        tags:'салями колбаса перец' },
  { id:'s04', cat:'sausage', name:'Сосиски говяжьи',            desc:'Натуральная оболочка',              price:590, unit:'кг', emoji:'🌭', badge:'',        tags:'сосиски говяжьи' },
  { id:'s05', cat:'sausage', name:'Сардельки домашние',         desc:'Крупный помол',                     price:620, unit:'кг', emoji:'🌭', badge:'',        tags:'сардельки домашние' },
  { id:'s06', cat:'sausage', name:'Суджук говяжий',             desc:'Вяленый, с чесноком и специями',    price:1690,unit:'кг', emoji:'🥓', badge:'хит',     img:'assets/sujuk.jpg', tags:'суджук вяленый деликатес' },
  { id:'s07', cat:'sausage', name:'Бастурма говяжья',           desc:'В обмазке чаман',                   price:2190,unit:'кг', emoji:'🥓', badge:'',        tags:'бастурма деликатес вяленое' },
  { id:'s08', cat:'sausage', name:'Курица копчёная (окорочок)', desc:'Горячего копчения',                 price:520, unit:'кг', emoji:'🍗', badge:'',        tags:'курица копчёная окорочок' },
  { id:'s09', cat:'sausage', name:'Грудинка говяжья копчёная',  desc:'Тонкая нарезка к завтраку',         price:1190,unit:'кг', emoji:'🥓', badge:'',        tags:'грудинка копчёная' },
  { id:'s10', cat:'sausage', name:'Мясная нарезка «Ассорти»',   desc:'4 вида, 300 г',                     price:590, unit:'уп', emoji:'🍖', badge:'новинка', tags:'нарезка ассорти мясная тарелка' },

  /* ---------- СЫРЫ И МОЛОЧНОЕ ---------- */
  { id:'c01', cat:'cheese', name:'Сыр домашний рассольный',   desc:'Из козьего и коровьего молока',       price:690, unit:'кг', emoji:'🧀', badge:'хит',     img:'assets/cheese.jpg', tags:'сыр домашний рассольный брынза' },
  { id:'c02', cat:'cheese', name:'Брынза',                    desc:'Классическая, в рассоле',             price:620, unit:'кг', emoji:'🧀', badge:'',        tags:'брынза сыр' },
  { id:'c03', cat:'cheese', name:'Сулугуни',                  desc:'Свежий, тянется',                     price:790, unit:'кг', emoji:'🧀', badge:'',        tags:'сулугуни сыр' },
  { id:'c04', cat:'cheese', name:'Сулугуни копчёный (косичка)', desc:'К пиву и на нарезку',               price:890, unit:'кг', emoji:'🧀', badge:'',        tags:'сулугуни копчёный косичка чечил' },
  { id:'c05', cat:'cheese', name:'Моцарелла',                 desc:'В рассоле, 125 г',                    price:190, unit:'шт', emoji:'🧀', badge:'',        tags:'моцарелла сыр' },
  { id:'c06', cat:'cheese', name:'Сыр твёрдый выдержанный',   desc:'6 месяцев выдержки',                  price:1190,unit:'кг', emoji:'🧀', badge:'',        tags:'сыр твёрдый выдержанный пармезан' },
  { id:'c07', cat:'cheese', name:'Творог домашний 9%',        desc:'Свежий, зернистый',                   price:420, unit:'кг', emoji:'🥛', badge:'',        tags:'творог домашний' },
  { id:'c08', cat:'cheese', name:'Сметана домашняя 25%',      desc:'Густая, 400 г',                       price:180, unit:'шт', emoji:'🥛', badge:'',        tags:'сметана домашняя' },
  { id:'c09', cat:'cheese', name:'Масло сливочное 82,5%',     desc:'180 г, натуральное',                  price:210, unit:'шт', emoji:'🧈', badge:'',        tags:'масло сливочное' },
  { id:'c10', cat:'cheese', name:'Айран домашний',            desc:'0,5 л, освежающий',                   price:80,  unit:'шт', emoji:'🥛', badge:'',        tags:'айран кефир напиток' },

  /* ---------- ПОЛУФАБРИКАТЫ ---------- */
  { id:'p01', cat:'semi', name:'Люля-кебаб из баранины',      desc:'Замороженные, 6 шт на шпажках',       price:790, unit:'кг', emoji:'🍢', badge:'хит',     tags:'люля кебаб баранина шашлык' },
  { id:'p02', cat:'semi', name:'Шашлык маринованный (баранина)', desc:'В луковом маринаде, в ведёрке',    price:990, unit:'кг', emoji:'🍢', badge:'хит',     tags:'шашлык маринованный баранина' },
  { id:'p03', cat:'semi', name:'Шашлык куриный',              desc:'Бёдра в специях',                     price:520, unit:'кг', emoji:'🍢', badge:'',        tags:'шашлык курица маринованный' },
  { id:'p04', cat:'semi', name:'Котлеты домашние',            desc:'Говядина + баранина, 10 шт',          price:650, unit:'кг', emoji:'🍔', badge:'',        tags:'котлеты домашние фарш' },
  { id:'p05', cat:'semi', name:'Голубцы полуфабрикат',        desc:'Ручная лепка',                        price:590, unit:'кг', emoji:'🥬', badge:'',        tags:'голубцы полуфабрикат' },
  { id:'p06', cat:'semi', name:'Перец фаршированный',         desc:'С мясом и рисом',                     price:590, unit:'кг', emoji:'🫑', badge:'',        tags:'перец фаршированный' },
  { id:'p07', cat:'semi', name:'Блины с мясом',               desc:'10 шт в упаковке',                    price:420, unit:'уп', emoji:'🥞', badge:'',        tags:'блины с мясом полуфабрикат' },
  { id:'p08', cat:'semi', name:'Наггетсы куриные',            desc:'В панировке, 500 г',                  price:320, unit:'уп', emoji:'🍗', badge:'',        tags:'наггетсы курица панировка' },
  { id:'p09', cat:'semi', name:'Купаты',                      desc:'Для гриля и сковороды',               price:690, unit:'кг', emoji:'🌭', badge:'',        tags:'купаты колбаски гриль' },
  { id:'p10', cat:'semi', name:'Тесто слоёное',               desc:'Замороженное, 500 г',                 price:180, unit:'уп', emoji:'🧊', badge:'',        tags:'тесто слоёное заморозка' },
  { id:'p11', cat:'semi', name:'Долма в виноградных листьях', desc:'Ручная лепка, полуфабрикат',          price:790, unit:'кг', emoji:'🍃', badge:'новинка', tags:'долма виноградные листья' },

  /* ---------- ХИНКАЛ И ПЕЛЬМЕНИ ---------- */
  { id:'d01', cat:'dumplings', name:'Хинкал аварский',        desc:'Тесто + бульон + мясо, набор',        price:450, unit:'уп', emoji:'🥟', badge:'хит',     tags:'хинкал аварский дагестанский' },
  { id:'d02', cat:'dumplings', name:'Хинкал даргинский',      desc:'С орехами и зеленью в тесте',         price:490, unit:'уп', emoji:'🥟', badge:'хит',     tags:'хинкал даргинский' },
  { id:'d03', cat:'dumplings', name:'Хинкал кумыкский',       desc:'Тонкие ромбики',                      price:430, unit:'уп', emoji:'🥟', badge:'',        tags:'хинкал кумыкский' },
  { id:'d04', cat:'dumplings', name:'Хинкали грузинские',     desc:'Ручная лепка, 10 шт',                 price:490, unit:'уп', emoji:'🥟', badge:'',        tags:'хинкали грузинские' },
  { id:'d05', cat:'dumplings', name:'Пельмени домашние',      desc:'Говядина + баранина, ручная лепка',   price:690, unit:'кг', emoji:'🥟', badge:'хит',     img:'assets/dumplings.jpg', tags:'пельмени домашние ручная лепка' },
  { id:'d06', cat:'dumplings', name:'Пельмени куриные',       desc:'Нежная начинка',                      price:520, unit:'кг', emoji:'🥟', badge:'',        tags:'пельмени куриные' },
  { id:'d07', cat:'dumplings', name:'Манты с мясом',          desc:'Крупные, 8 шт',                       price:590, unit:'кг', emoji:'🥟', badge:'',        tags:'манты мясо' },
  { id:'d08', cat:'dumplings', name:'Вареники с картошкой',   desc:'С жареным луком',                     price:390, unit:'кг', emoji:'🥟', badge:'',        tags:'вареники картошка' },
  { id:'d09', cat:'dumplings', name:'Вареники с творогом',    desc:'Сладкие, к сметане',                  price:390, unit:'кг', emoji:'🥟', badge:'',        tags:'вареники творог' },
  { id:'d10', cat:'dumplings', name:'Курзе с мясом',          desc:'Дагестанская классика',               price:650, unit:'кг', emoji:'🥟', badge:'новинка', tags:'курзе дагестанские мясо' },

  /* ---------- СТЕЙКИ И ГРИЛЬ ---------- */
  { id:'t01', cat:'steak', name:'Стейк Рибай',                desc:'Мраморная говядина, ~350 г',          price:1990,unit:'кг', emoji:'🥩', badge:'хит',     img:'assets/steak.jpg', tags:'стейк рибай мраморный премиум' },
  { id:'t02', cat:'steak', name:'Стейк Стриплойн',            desc:'Плотная текстура, ~300 г',            price:1790,unit:'кг', emoji:'🥩', badge:'',        tags:'стейк стриплойн нью-йорк' },
  { id:'t03', cat:'steak', name:'Стейк Мачете',               desc:'Насыщенный вкус, для гриля',          price:1290,unit:'кг', emoji:'🥩', badge:'',        tags:'стейк мачете скёрт' },
  { id:'t04', cat:'steak', name:'Стейк Фланк',                desc:'Отлично под маринад',                 price:1190,unit:'кг', emoji:'🥩', badge:'',        tags:'стейк фланк' },
  { id:'t05', cat:'steak', name:'Каре ягнёнка',               desc:'8 рёбрышек, зачищено',                price:1890,unit:'кг', emoji:'🐑', badge:'новинка', img:'assets/ribs.jpg', tags:'каре ягнёнка баранина гриль' },
  { id:'t06', cat:'steak', name:'Стейк из индейки',           desc:'Филе бедра, маринованное',            price:690, unit:'кг', emoji:'🦃', badge:'',        tags:'стейк индейка' },
  { id:'t07', cat:'steak', name:'Уголь древесный 3 кг',       desc:'Берёзовый, для мангала',              price:290, unit:'шт', emoji:'🔥', badge:'',        tags:'уголь мангал гриль берёзовый' },
  { id:'t08', cat:'steak', name:'Набор для гриля (2 кг)',     desc:'Стейки + купаты + овощи',             price:2490,unit:'шт', emoji:'🔥', badge:'акция',   tags:'набор гриль пикник' },

  /* ---------- САЛАТЫ И ЗАКУСКИ ---------- */
  { id:'a01', cat:'salads', name:'Оливье',                    desc:'Домашний, 500 г',                     price:390, unit:'уп', emoji:'🥗', badge:'',        tags:'салат оливье' },
  { id:'a02', cat:'salads', name:'Салат «Цезарь» с курицей',  desc:'Свежая заправка, 350 г',              price:420, unit:'уп', emoji:'🥗', badge:'хит',     tags:'салат цезарь курица' },
  { id:'a03', cat:'salads', name:'Салат из свежих овощей',    desc:'Помидор, огурец, зелень',             price:250, unit:'уп', emoji:'🥗', badge:'',        tags:'салат овощной свежий' },
  { id:'a04', cat:'salads', name:'Мимоза',                    desc:'400 г',                               price:340, unit:'уп', emoji:'🥗', badge:'',        tags:'салат мимоза' },
  { id:'a05', cat:'salads', name:'Баклажаны по-грузински',    desc:'С ореховой пастой',                   price:450, unit:'уп', emoji:'🍆', badge:'',        tags:'баклажаны закуска орехи грузинские' },
  { id:'a06', cat:'salads', name:'Аджапсандал',               desc:'Овощное рагу, холодная закуска',      price:390, unit:'уп', emoji:'🍆', badge:'',        tags:'аджапсандал овощи закуска' },
  { id:'a07', cat:'salads', name:'Хумус',                     desc:'250 г, с оливковым маслом',           price:290, unit:'уп', emoji:'🫘', badge:'новинка', tags:'хумус закуска нут' },
  { id:'a08', cat:'salads', name:'Сырная тарелка',            desc:'4 вида сыра + орехи + мёд',           price:790, unit:'шт', emoji:'🧀', badge:'',        tags:'сырная тарелка нарезка' },

  /* ---------- СЭНДВИЧИ И ШАУРМА ---------- */
  { id:'w01', cat:'sandwich', name:'Шаурма классическая',     desc:'Курица, овощи, фирменный соус',       price:290, unit:'шт', emoji:'🌯', badge:'хит',     tags:'шаурма курица' },
  { id:'w02', cat:'sandwich', name:'Шаурма с говядиной',      desc:'Сочная, в лаваше',                    price:350, unit:'шт', emoji:'🌯', badge:'',        tags:'шаурма говядина' },
  { id:'w03', cat:'sandwich', name:'Шаурма в сырном лаваше',  desc:'С сулугуни',                          price:380, unit:'шт', emoji:'🌯', badge:'новинка', tags:'шаурма сырная сулугуни' },
  { id:'w04', cat:'sandwich', name:'Сэндвич с курицей и сыром', desc:'На тостовом хлебе',                 price:250, unit:'шт', emoji:'🥪', badge:'',        tags:'сэндвич курица сыр' },
  { id:'w05', cat:'sandwich', name:'Сэндвич с бастурмой',     desc:'Багет, овощи, соус',                  price:320, unit:'шт', emoji:'🥪', badge:'',        tags:'сэндвич бастурма багет' },
  { id:'w06', cat:'sandwich', name:'Бургер говяжий',          desc:'Котлета 150 г, булочка бриошь',       price:390, unit:'шт', emoji:'🍔', badge:'',        tags:'бургер говядина' },
  { id:'w07', cat:'sandwich', name:'Хот-дог',                 desc:'С сосиской домашней',                 price:190, unit:'шт', emoji:'🌭', badge:'',        tags:'хот-дог сосиска' },

  /* ---------- МЁД И ВАРЕНЬЕ ---------- */
  { id:'h01', cat:'honey', name:'Мёд горный (Дагестан)',      desc:'0,5 л, натуральный',                  price:790, unit:'шт', emoji:'🍯', badge:'хит',     tags:'мёд горный дагестанский натуральный' },
  { id:'h02', cat:'honey', name:'Мёд акациевый',              desc:'0,5 л, светлый, не густеет',          price:850, unit:'шт', emoji:'🍯', badge:'',        tags:'мёд акациевый' },
  { id:'h03', cat:'honey', name:'Мёд с орехами',              desc:'Грецкий орех в мёде, 0,4 л',          price:990, unit:'шт', emoji:'🍯', badge:'',        tags:'мёд орехи грецкий' },
  { id:'h04', cat:'honey', name:'Урбеч абрикосовый',          desc:'250 г, только косточки',              price:490, unit:'шт', emoji:'🥜', badge:'хит',     img:'assets/urbech.jpg', tags:'урбеч абрикос дагестан паста' },
  { id:'h05', cat:'honey', name:'Урбеч льняной',              desc:'250 г, классический',                 price:420, unit:'шт', emoji:'🥜', badge:'',        tags:'урбеч лён' },
  { id:'h06', cat:'honey', name:'Варенье из кизила',          desc:'0,5 л, домашнее',                     price:450, unit:'шт', emoji:'🫙', badge:'',        tags:'варенье кизил домашнее' },
  { id:'h07', cat:'honey', name:'Варенье из инжира',          desc:'0,5 л, целыми плодами',               price:520, unit:'шт', emoji:'🫙', badge:'',        tags:'варенье инжир' },
  { id:'h08', cat:'honey', name:'Пахлава домашняя',           desc:'Медовая, 500 г',                      price:590, unit:'уп', emoji:'🍮', badge:'',        tags:'пахлава сладости десерт мёд' },

  { id:'h09', cat:'honey', name:'Халва домашняя',             desc:'На развес, с грецким орехом',         price:590, unit:'кг', emoji:'🍥', badge:'',        img:'assets/halva.jpg', tags:'халва сладости десерт' },
  { id:'h10', cat:'honey', name:'Чак-чак',                     desc:'Медовый, в фирменной упаковке',       price:690, unit:'кг', emoji:'🍯', badge:'хит',     img:'assets/chakchak-brand.jpg', tags:'чак-чак сладости мёд' },

  /* ---------- ПРЯНОСТИ И ПРИПРАВЫ ---------- */
  { id:'sp01', cat:'spices', name:'Приправа для шашлыка',     desc:'Фирменная смесь, 100 г',              price:150, unit:'шт', emoji:'🧂', badge:'хит',     tags:'приправа шашлык специи смесь' },
  { id:'sp02', cat:'spices', name:'Хмели-сунели',             desc:'100 г, грузинская смесь',             price:140, unit:'шт', emoji:'🌿', badge:'',        tags:'хмели-сунели специи' },
  { id:'sp03', cat:'spices', name:'Паприка копчёная',         desc:'100 г, сладкая',                      price:130, unit:'шт', emoji:'🌶️', badge:'',       tags:'паприка копчёная специи' },
  { id:'sp04', cat:'spices', name:'Зира (кумин)',             desc:'100 г, для плова',                    price:160, unit:'шт', emoji:'🌿', badge:'',        tags:'зира кумин плов' },
  { id:'sp05', cat:'spices', name:'Чёрный перец горошком',    desc:'100 г',                               price:170, unit:'шт', emoji:'⚫', badge:'',        tags:'перец чёрный горошек' },
  { id:'sp06', cat:'spices', name:'Сумах',                    desc:'100 г, кисловатый вкус',              price:150, unit:'шт', emoji:'🌿', badge:'',        tags:'сумах специи' },
  { id:'sp07', cat:'spices', name:'Соль морская крупная',     desc:'1 кг',                                price:90,  unit:'шт', emoji:'🧂', badge:'',        tags:'соль морская' },
  { id:'sp08', cat:'spices', name:'Смесь для плова',          desc:'100 г, с барбарисом',                 price:150, unit:'шт', emoji:'🍚', badge:'',        tags:'приправа плов барбарис' },
  { id:'sp09', cat:'spices', name:'Чабрец сушёный',           desc:'50 г, для чая и мяса',                price:120, unit:'шт', emoji:'🌿', badge:'',        tags:'чабрец тимьян травы' },

  /* ---------- СОУСЫ И ЗАПРАВКИ ---------- */
  { id:'sc01', cat:'sauces', name:'Аджика домашняя острая',   desc:'250 г, жгучая',                       price:250, unit:'шт', emoji:'🌶️', badge:'хит',    tags:'аджика острая соус домашняя' },
  { id:'sc02', cat:'sauces', name:'Ткемали',                  desc:'250 г, из алычи',                     price:260, unit:'шт', emoji:'🫙', badge:'',        tags:'ткемали соус алыча' },
  { id:'sc03', cat:'sauces', name:'Сацебели',                 desc:'250 г, томатный с травами',           price:250, unit:'шт', emoji:'🫙', badge:'',        tags:'сацебели соус томатный' },
  { id:'sc04', cat:'sauces', name:'Чесночный соус',           desc:'250 г, к мясу и шаурме',              price:220, unit:'шт', emoji:'🧄', badge:'',        tags:'соус чесночный' },
  { id:'sc05', cat:'sauces', name:'Наршараб',                 desc:'0,3 л, гранатовый соус',              price:390, unit:'шт', emoji:'🍷', badge:'',        tags:'наршараб гранатовый соус' },
  { id:'sc06', cat:'sauces', name:'Оливковое масло Extra Virgin', desc:'0,5 л, первый отжим',             price:790, unit:'шт', emoji:'🫒', badge:'',        tags:'масло оливковое заправка' },
  { id:'sc07', cat:'sauces', name:'Бальзамический уксус',     desc:'0,25 л',                              price:450, unit:'шт', emoji:'🫙', badge:'',        tags:'уксус бальзамический заправка' },
  { id:'sc08', cat:'sauces', name:'Горчица зернистая',        desc:'200 г',                               price:210, unit:'шт', emoji:'🫙', badge:'',        tags:'горчица зернистая' },

  /* ---------- ОРЕХИ И СУХОФРУКТЫ ---------- */
  { id:'n01', cat:'nuts', name:'Грецкий орех очищенный',      desc:'Урожай этого года',                   price:1290,unit:'кг', emoji:'🌰', badge:'хит',     img:'assets/nuts.jpg', tags:'орех грецкий очищенный' },
  { id:'n02', cat:'nuts', name:'Миндаль жареный',             desc:'Солёный / без соли',                  price:1490,unit:'кг', emoji:'🥜', badge:'',        tags:'миндаль жареный орехи' },
  { id:'n03', cat:'nuts', name:'Фундук',                      desc:'Обжаренный, очищенный',               price:1690,unit:'кг', emoji:'🌰', badge:'',        tags:'фундук орехи' },
  { id:'n04', cat:'nuts', name:'Кешью',                       desc:'Сырой / жареный',                     price:1590,unit:'кг', emoji:'🥜', badge:'',        tags:'кешью орехи' },
  { id:'n05', cat:'nuts', name:'Фисташки солёные',            desc:'Обжаренные, в скорлупе',              price:1890,unit:'кг', emoji:'🥜', badge:'',        tags:'фисташки солёные' },
  { id:'n06', cat:'nuts', name:'Курага',                      desc:'Мягкая, без сахара',                  price:790, unit:'кг', emoji:'🍑', badge:'',        tags:'курага сухофрукты абрикос' },
  { id:'n07', cat:'nuts', name:'Чернослив',                   desc:'Без косточки',                        price:690, unit:'кг', emoji:'🫐', badge:'',        tags:'чернослив сухофрукты' },
  { id:'n08', cat:'nuts', name:'Финики королевские',          desc:'Меджул, крупные',                     price:990, unit:'кг', emoji:'🌴', badge:'хит',     tags:'финики меджул сухофрукты' },
  { id:'n09', cat:'nuts', name:'Изюм светлый',                desc:'Без косточек',                        price:490, unit:'кг', emoji:'🍇', badge:'',        tags:'изюм сухофрукты' },
  { id:'n10', cat:'nuts', name:'Семечки тыквенные',           desc:'Очищенные, сырые',                    price:890, unit:'кг', emoji:'🎃', badge:'',        tags:'семечки тыквенные' },

  /* ---------- ОВОЩИ И ФРУКТЫ ---------- */
  { id:'v01', cat:'veg', name:'Помидоры бакинские',           desc:'Ароматные, спелые',                   price:290, unit:'кг', emoji:'🍅', badge:'хит',     tags:'помидоры томаты бакинские' },
  { id:'v02', cat:'veg', name:'Огурцы грунтовые',             desc:'Хрустящие',                           price:180, unit:'кг', emoji:'🥒', badge:'',        tags:'огурцы' },
  { id:'v03', cat:'veg', name:'Картофель',                    desc:'Мытый, крупный',                      price:60,  unit:'кг', emoji:'🥔', badge:'',        tags:'картофель картошка' },
  { id:'v04', cat:'veg', name:'Лук репчатый',                 desc:'Жёлтый',                              price:45,  unit:'кг', emoji:'🧅', badge:'',        tags:'лук репчатый' },
  { id:'v05', cat:'veg', name:'Зелень (кинза, петрушка, укроп)', desc:'Пучок, свежая',                    price:60,  unit:'шт', emoji:'🌿', badge:'',        tags:'зелень кинза петрушка укроп' },
  { id:'v06', cat:'veg', name:'Перец болгарский',             desc:'Красный / жёлтый',                    price:220, unit:'кг', emoji:'🫑', badge:'',        tags:'перец болгарский' },
  { id:'v07', cat:'veg', name:'Баклажаны',                    desc:'Молодые',                             price:170, unit:'кг', emoji:'🍆', badge:'',        tags:'баклажаны' },
  { id:'v08', cat:'veg', name:'Чеснок',                       desc:'Местный, крупный',                    price:290, unit:'кг', emoji:'🧄', badge:'',        tags:'чеснок' },
  { id:'v09', cat:'veg', name:'Лимоны',                       desc:'Сочные',                              price:250, unit:'кг', emoji:'🍋', badge:'',        tags:'лимоны цитрус' },
  { id:'v10', cat:'veg', name:'Яблоки',                       desc:'Сладкие, местные',                    price:150, unit:'кг', emoji:'🍎', badge:'',        tags:'яблоки фрукты' },
  { id:'v11', cat:'veg', name:'Гранат',                       desc:'Крупный, сладкий',                    price:280, unit:'кг', emoji:'🍎', badge:'',        tags:'гранат фрукты' },
  { id:'v12', cat:'veg', name:'Виноград',                     desc:'Местный, кишмиш',                     price:260, unit:'кг', emoji:'🍇', badge:'',        tags:'виноград кишмиш фрукты' },

  /* ---------- СНЕКИ И НАПИТКИ ---------- */
  { id:'k01', cat:'snacks', name:'Чипсы из лаваша',           desc:'С зеленью и специями, 100 г',         price:150, unit:'шт', emoji:'🍿', badge:'новинка', tags:'чипсы лаваш снеки' },
  { id:'k02', cat:'snacks', name:'Сухарики ржаные',           desc:'С чесноком, 100 г',                   price:90,  unit:'шт', emoji:'🍘', badge:'',        tags:'сухарики снеки' },
  { id:'k03', cat:'snacks', name:'Мясные чипсы (джерки)',     desc:'Говядина, 50 г',                      price:390, unit:'шт', emoji:'🥓', badge:'хит',     tags:'джерки мясные чипсы снеки' },
  { id:'k04', cat:'snacks', name:'Начос с сыром',             desc:'Порция 150 г',                        price:220, unit:'шт', emoji:'🌮', badge:'',        tags:'начос снеки сыр' },
  { id:'k05', cat:'snacks', name:'Вода питьевая 1,5 л',       desc:'Негазированная',                      price:60,  unit:'шт', emoji:'💧', badge:'',        tags:'вода напиток' },
  { id:'k06', cat:'snacks', name:'Компот домашний 1 л',       desc:'Из сухофруктов',                      price:180, unit:'шт', emoji:'🥤', badge:'',        tags:'компот напиток' },
  { id:'k07', cat:'snacks', name:'Кофе с собой',              desc:'Американо / капучино / латте',        price:150, unit:'шт', emoji:'☕', badge:'',        tags:'кофе капучино латте американо напиток' },
  { id:'k08', cat:'snacks', name:'Чай травяной с чабрецом',   desc:'Стакан 0,4 л',                        price:120, unit:'шт', emoji:'🍵', badge:'',        tags:'чай травяной чабрец напиток' }
];
