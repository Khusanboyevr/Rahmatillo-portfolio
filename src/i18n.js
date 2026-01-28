import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            uz: {
                translation: {
                    nav: {
                        home: "Bosh sahifa",
                        projects: "Loyihalar",
                        contact: "Bog'lanish"
                    },
                    hero: {
                        badge: "Sizning professional hamkoringiz",
                        experience: "Elmurodovich",
                        experience_accent: "Rahmatillo",
                        world: "Yangi Dunyo.",
                        frontend: "Frontend dasturchi",
                        trader: "Trader",
                        description_part1: "Ba'zi ",
                        description_accent1: "muammolar",
                        description_part2: " yillar davomida javobsiz qoladi. Men to'g'ri savol va bir nechta qator kod bilan hammasini ",
                        description_accent2: "o'zgartirishim",
                        description_part3: " mumkin.",
                        cta_projects: "LOYIHALAR",
                        cta_about: "Haqimda bilish",
                        projects_count: "Kichik qadamlar",
                        footer: "barcha huquqlar himoyalangan"
                    },
                    about: {
                        developer: "Dasturchi",
                        trader: "Trader",
                        dev_quote: "Hammasi bitta savoldan boshlandi:",
                        dev_question: "“Buni qanday avtomatlashtirish mumkin?”",
                        dev_lead: "Shu savol meni texnologiya olamiga yetaklab keldi.",
                        today_i_am: "Bugun esa men:",
                        dev_list: [
                            "Interfeyslar quraman",
                            "Foydalanuvchi tajribasini (UX) tahlil qilaman",
                            "Kodni jim va samarali ishlashga majbur qilaman",
                            "Dasturlash menga sabr, aniqlik va mas’uliyatni o‘rgatadi"
                        ],
                        dev_summary: "Men uchun frontend — bu shunchaki dizayn emas. Bu tajriba, tezlik va aniqlik demakdir.",
                        dev_end: "Har bir loyiha — yangi savol. Har bir savol — yangi yechim.",
                        trade_quote: "Hammasi bitta savoldan boshlandi:",
                        trade_question: "“Bu harakat ortida qanday mantiq bor?”",
                        trade_lead: "Shu savol meni bozorni kuzatishga, raqamlar ortidagi sabablarni tushunishga olib keldi.",
                        trade_list: [
                            "Bozorni hissiyot emas, ehtimollar orqali baholayman",
                            "Har bir qarorni risk va mukofot nisbatida o‘lchayman",
                            "Shovqin ichidan muhim signallarni ajratib olaman",
                            "Trading menga sabr, intizom va mas’uliyatni o‘rgatadi"
                        ],
                        trade_summary: "Men uchun trading — bu shunchaki grafik emas. Bu qaror, vaqt va intizom demakdir.",
                        trade_end: "Har bir bozor — yangi tajriba. Har bir tajriba — yangi bilim.",
                        motto_dev: "“Mukammallik — bu qo‘shadigan narsa qolmaganda emas, balki olib tashlaydigan narsa qolmaganda erishiladi.”",
                        motto_trade: "“Tradingda eng katta dushman — bu intizomsizlik. Eng katta do‘st esa — sabr.”"
                    },
                    projects: {
                        title: "Loyihalar",
                        description: "Frontend yo‘nalishida yaratgan saytlarim.",
                        tabs: {
                            glass: "Scroll rejimi",
                            masonry: "Grid rejimi"
                        },
                        loading: "Loyihalar yuklanmoqda..."
                    },
                    contact: {
                        title: "Bog‘lanish",
                        description: "Loyihalar, takliflar yoki savollar bo‘lsa — bemalol yozing",
                        sms: "SMS yuborish",
                        form: {
                            name: "Ismingiz",
                            email: "Email",
                            message: "Xabaringizni shu yerga yozing...",
                            submit: "Xabarni yuborish",
                            success: "Xabaringiz yuborildi! Tez orada javob beraman.",
                            note: "Odatda 24 soat ichida javob beraman"
                        }
                    }
                }
            },
            ru: {
                translation: {
                    nav: {
                        home: "Главная",
                        projects: "Проекты",
                        contact: "Контакты"
                    },
                    hero: {
                        badge: "Ваш профессиональный партнер",
                        experience: "Elmurodovich",
                        experience_accent: "Rahmatillo",
                        world: "Новый Мир.",
                        frontend: "Frontend разработчик",
                        trader: "Трейдер",
                        description_part1: "Некоторые ",
                        description_accent1: "проблемы",
                        description_part2: " годами остаются без ответа. Я могу изменить все с помощью правильного вопроса и нескольких строк кода. ",
                        description_accent2: "изменить",
                        description_part3: " всё.",
                        cta_projects: "ПРОЕКТЫ",
                        cta_about: "Обо мне",
                        projects_count: "Маленькие шаги",
                        footer: "все права защищены"
                    },
                    about: {
                        developer: "Разработчик",
                        trader: "Трейдер",
                        dev_quote: "Все началось с одного вопроса:",
                        dev_question: "“Как это можно автоматизировать?”",
                        dev_lead: "Этот вопрос привел меня в мир технологий.",
                        today_i_am: "Сегодня я:",
                        dev_list: [
                            "Создаю интерфейсы",
                            "Анализирую пользовательский опыт (UX)",
                            "Заставляю код работать тихо и эффективно",
                            "Программирование учит меня терпению, точности и ответственности"
                        ],
                        dev_summary: "Для меня фронтенд — это не просто дизайн. Это опыт, скорость и точность.",
                        dev_end: "Каждый проект — новый вопрос. Каждый вопрос — новое решение.",
                        trade_quote: "Все началось с одного вопроса:",
                        trade_question: "“Какая логика стоит за этим движением?”",
                        trade_lead: "Этот вопрос привел меня к наблюдению за рынком, пониманию причин за цифрами.",
                        trade_list: [
                            "Оцениваю рынок через вероятности, а не эмоции",
                            "Измеряю каждое решение в соотношении риска и прибыли",
                            "Выделяю важные сигналы из шума",
                            "Трейдинг учит меня терпению, дисциплине и ответственности"
                        ],
                        trade_summary: "Для меня трейдинг — это не просто графики. Это решение, время и дисциплина.",
                        trade_end: "Каждый рынок — новый опыт. Каждый опыт — новые знания.",
                        motto_dev: "“Совершенство достигается не тогда, когда нечего добавить, а когда нечего отнять.”",
                        motto_trade: "“В трейдинге самый большой враг — недисциплинированность. А самый лучший друг — терпение.”"
                    },
                    projects: {
                        title: "Проекты",
                        description: "Сайты, которые я создал в направлении фронтенда.",
                        tabs: {
                            glass: "Режим прокрутки",
                            masonry: "Режим сетки"
                        },
                        loading: "Загрузка проектов..."
                    },
                    contact: {
                        title: "Контакты",
                        description: "Пишите по поводу проектов, предложений или вопросов",
                        sms: "Отправить SMS",
                        form: {
                            name: "Ваше имя",
                            email: "Email",
                            message: "Напишите ваше сообщение здесь...",
                            submit: "Отправить сообщение",
                            success: "Ваше сообщение отправлено! Скоро отвечу.",
                            note: "Обычно отвечаю в течение 24 часов"
                        }
                    }
                }
            },
            tr: {
                translation: {
                    nav: {
                        home: "Ana Sayfa",
                        projects: "Projeler",
                        contact: "İletişim"
                    },
                    hero: {
                        badge: "Profesyonel ortağınız",
                        experience: "Elmurodovich",
                        experience_accent: "Rahmatillo",
                        world: "Yeni Dünya.",
                        frontend: "Frontend Geliştirici",
                        trader: "Trader",
                        description_part1: "Bazı ",
                        description_accent1: "sorunlar",
                        description_part2: " yıllarca cevapsız kalır. Doğru soru ve birkaç satır kodla her şeyi ",
                        description_accent2: "değiştirebilirim",
                        description_part3: ".",
                        cta_projects: "PROJELER",
                        cta_about: "Hakkımda",
                        projects_count: "Küçük adımlar",
                        footer: "tüm hakları saklıdır"
                    },
                    about: {
                        developer: "Geliştirici",
                        trader: "Trader",
                        dev_quote: "Her şey tek bir soruyla başladı:",
                        dev_question: "“Bunu nasıl otomatikleştirebilirim?”",
                        dev_lead: "Bu soru beni teknoloji dünyasına getirdi.",
                        today_i_am: "Bugün ben:",
                        dev_list: [
                            "Arayüzler oluşturuyorum",
                            "Kullanıcı deneyimini (UX) analiz ediyorum",
                            "Kodun sessiz ve verimli çalışmasını sağlıyorum",
                            "Programlama bana sabır, doğruluk ve sorumluluk öğretiyor"
                        ],
                        dev_summary: "Benim için frontend sadece tasarım değil. Deneyim, hız ve doğruluk demektir.",
                        dev_end: "Her proje yeni bir soru. Her soru yeni bir çözüm.",
                        trade_quote: "Her şey tek bir soruyla başladı:",
                        trade_question: "“Bu hareketin arkasındaki mantık nedir?”",
                        trade_lead: "Bu soru beni piyasayı gözlemlemeye, rakamların arkasındaki nedenleri anlamaya yöneltti.",
                        trade_list: [
                            "Piyasayı duygularla değil, olasılıklarla değerlendiriyorum",
                            "Her kararı risk ve ödül oranında ölçüyorum",
                            "Gürültü arasından önemli sinyalleri ayıklıyorum",
                            "Trading bana sabır, disiplin ve sorumluluk öğretiyor"
                        ],
                        trade_summary: "Benim için trading sadece grafiklerden ibaret değil. Karar, zaman ve disiplin demektir.",
                        trade_end: "Her piyasa yeni bir deneyim. Her deneyim yeni bir bilgi.",
                        motto_dev: "“Mükemmellik eklenecek bir şey kalmadığında değil, çıkarılacak bir şey kalmadığında elde edilir.”",
                        motto_trade: "“Trading'de en büyük düşman disiplinsizliktir. En büyük dost ise sabırdır.”"
                    },
                    projects: {
                        title: "Projeler",
                        description: "Frontend alanında geliştirdiğim web siteleri.",
                        tabs: {
                            glass: "Kaydırma modu",
                            masonry: "Izgara modu"
                        },
                        loading: "Projeler yükleniyor..."
                    },
                    contact: {
                        title: "İletişim",
                        description: "Projeler, teklifler veya sorularınız için yazabilirsiniz",
                        sms: "SMS gönder",
                        form: {
                            name: "Adınız",
                            email: "E-posta",
                            message: "Mesajınızı buraya yazın...",
                            submit: "Mesajı gönder",
                            success: "Mesajınız gönderildi! Yakında dönüş yapacağım.",
                            note: "Genellikle 24 saat içinde cevap veririm"
                        }
                    }
                }
            },
            en: {
                translation: {
                    nav: {
                        home: "Home",
                        projects: "Projects",
                        contact: "Contact"
                    },
                    hero: {
                        badge: "Your professional partner",
                        experience: "Elmurodovich",
                        experience_accent: "Rahmatillo",
                        world: "New World.",
                        frontend: "Frontend Developer",
                        trader: "Trader",
                        description_part1: "Some ",
                        description_accent1: "problems",
                        description_part2: " remain unanswered for years. I can ",
                        description_accent2: "change",
                        description_part3: " everything with the right question and a few lines of code.",
                        cta_projects: "PROJECTS",
                        cta_about: "About Me",
                        projects_count: "Small steps",
                        footer: "all rights reserved"
                    },
                    about: {
                        developer: "Developer",
                        trader: "Trader",
                        dev_quote: "It all started with one question:",
                        dev_question: "“How can this be automated?”",
                        dev_lead: "This question led me into the world of technology.",
                        today_i_am: "Today I:",
                        dev_list: [
                            "Build interfaces",
                            "Analyze user experience (UX)",
                            "Make code work quietly and efficiently",
                            "Programming teaches me patience, accuracy, and responsibility"
                        ],
                        dev_summary: "To me, frontend is not just design. It means experience, speed, and accuracy.",
                        dev_end: "Every project is a new question. Every question is a new solution.",
                        trade_quote: "It all started with one question:",
                        trade_question: "“What is the logic behind this movement?”",
                        trade_lead: "This question led me to observe the market, understanding the reasons behind the numbers.",
                        trade_list: [
                            "I evaluate the market through probabilities, not emotions",
                            "I measure every decision in risk-to-reward ratio",
                            "I isolate important signals from the noise",
                            "Trading teaches me patience, discipline, and responsibility"
                        ],
                        trade_summary: "To me, trading is not just about charts. It means decision, time, and discipline.",
                        trade_end: "Every market is a new experience. Every experience is new knowledge.",
                        motto_dev: "“Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.”",
                        motto_trade: "“In trading, the biggest enemy is indiscipline. The best friend is patience.”"
                    },
                    projects: {
                        title: "Projects",
                        description: "Websites I have created in the frontend direction.",
                        tabs: {
                            glass: "Scroll mode",
                            masonry: "Grid mode"
                        },
                        loading: "Loading projects..."
                    },
                    contact: {
                        title: "Contact",
                        description: "Feel free to write for projects, proposals, or questions",
                        sms: "Send SMS",
                        form: {
                            name: "Your Name",
                            email: "Email",
                            message: "Write your message here...",
                            submit: "Send Message",
                            success: "Your message has been sent! I will respond soon.",
                            note: "I usually respond within 24 hours"
                        }
                    }
                }
            }
        },
        fallbackLng: 'uz',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
