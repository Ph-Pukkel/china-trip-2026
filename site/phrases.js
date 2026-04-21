// phrases.js — Essential Chinese phrases, grouped by situation

export const PHRASES = [
  {
    group: "taxi",
    title_nl: "🚕 Taxi / DiDi",
    title_es: "🚕 Taxi / DiDi",
    title_zh: "出租车",
    items: [
      { zh: "请带我去这里。", py: "Qǐng dài wǒ qù zhèlǐ.", nl: "Breng me alstublieft naar hier.", es: "Lléveme aquí, por favor." },
      { zh: "请用打表。", py: "Qǐng yòng dǎbiǎo.", nl: "Gebruik a.u.b. de meter.", es: "Use el taxímetro, por favor." },
      { zh: "多少钱?", py: "Duōshǎo qián?", nl: "Hoeveel kost het?", es: "¿Cuánto cuesta?" },
      { zh: "请在这里停车。", py: "Qǐng zài zhèlǐ tíngchē.", nl: "Stop hier alstublieft.", es: "Pare aquí, por favor." },
      { zh: "我去北京首都机场。", py: "Wǒ qù Běijīng Shǒudū Jīchǎng.", nl: "Ik ga naar Beijing Capital Airport.", es: "Voy al aeropuerto Capital de Pekín." },
      { zh: "我去西安北站。", py: "Wǒ qù Xī'ān Běi Zhàn.", nl: "Ik ga naar Xi'an Noord station.", es: "Voy a la estación Xi'an Norte." },
    ],
  },
  {
    group: "restaurant",
    title_nl: "🍜 Restaurant",
    title_es: "🍜 Restaurante",
    title_zh: "餐厅",
    items: [
      { zh: "菜单,请。", py: "Càidān, qǐng.", nl: "Menu alstublieft.", es: "La carta, por favor." },
      { zh: "请不要辣。", py: "Qǐng bù yào là.", nl: "Niet pittig alstublieft.", es: "Sin picante, por favor." },
      { zh: "我吃素。", py: "Wǒ chī sù.", nl: "Ik ben vegetarisch.", es: "Soy vegetariano/a." },
      { zh: "我对花生过敏。", py: "Wǒ duì huāshēng guòmǐn.", nl: "Ik ben allergisch voor pinda.", es: "Soy alérgico/a al cacahuete." },
      { zh: "这个多少钱?", py: "Zhège duōshǎo qián?", nl: "Hoeveel kost dit?", es: "¿Cuánto cuesta esto?" },
      { zh: "买单。", py: "Mǎidān.", nl: "De rekening, alstublieft.", es: "La cuenta, por favor." },
      { zh: "好吃!", py: "Hǎo chī!", nl: "Lekker!", es: "¡Está rico!" },
    ],
  },
  {
    group: "shop",
    title_nl: "🛍️ Winkel",
    title_es: "🛍️ Tienda",
    title_zh: "商店",
    items: [
      { zh: "可以便宜一点吗?", py: "Kěyǐ piányi yīdiǎn ma?", nl: "Kan het goedkoper?", es: "¿Puede bajar el precio?" },
      { zh: "太贵了。", py: "Tài guì le.", nl: "Dat is te duur.", es: "Es muy caro." },
      { zh: "可以刷卡吗?", py: "Kěyǐ shuākǎ ma?", nl: "Kan ik met kaart betalen?", es: "¿Acepta tarjeta?" },
      { zh: "有别的颜色吗?", py: "Yǒu biéde yánsè ma?", nl: "Heeft u andere kleuren?", es: "¿Tiene otros colores?" },
      { zh: "不要,谢谢。", py: "Bù yào, xièxie.", nl: "Nee, dank u.", es: "No, gracias." },
    ],
  },
  {
    group: "help",
    title_nl: "🙏 Hulp / richting",
    title_es: "🙏 Ayuda / dirección",
    title_zh: "帮助",
    items: [
      { zh: "对不起,您会说英语吗?", py: "Duìbùqǐ, nín huì shuō Yīngyǔ ma?", nl: "Excuseer, spreekt u Engels?", es: "Disculpe, ¿habla inglés?" },
      { zh: "厕所在哪里?", py: "Cèsuǒ zài nǎlǐ?", nl: "Waar is het toilet?", es: "¿Dónde está el baño?" },
      { zh: "请帮我。", py: "Qǐng bāng wǒ.", nl: "Help me alstublieft.", es: "Ayúdeme, por favor." },
      { zh: "我迷路了。", py: "Wǒ mílù le.", nl: "Ik ben verdwaald.", es: "Estoy perdido/a." },
      { zh: "谢谢。 / 不客气。", py: "Xièxie. / Bù kèqi.", nl: "Dank u. / Graag gedaan.", es: "Gracias. / De nada." },
    ],
  },
  {
    group: "emergency",
    title_nl: "🆘 Noodgeval",
    title_es: "🆘 Emergencia",
    title_zh: "紧急",
    items: [
      { zh: "叫救护车!", py: "Jiào jiùhùchē!", nl: "Bel een ambulance!", es: "¡Llame a una ambulancia!" },
      { zh: "叫警察!", py: "Jiào jǐngchá!", nl: "Bel de politie!", es: "¡Llame a la policía!" },
      { zh: "我需要医生。", py: "Wǒ xūyào yīshēng.", nl: "Ik heb een dokter nodig.", es: "Necesito un médico." },
      { zh: "请打110(警察)/ 120(救护车)。", py: "Qǐng dǎ yī-yī-líng / yī-èr-líng.", nl: "Bel 110 (politie) of 120 (ambulance).", es: "Llame al 110 o 120." },
      { zh: "我丢了护照。", py: "Wǒ diūle hùzhào.", nl: "Ik ben mijn paspoort kwijt.", es: "Perdí mi pasaporte." },
    ],
  },
  {
    group: "direction",
    title_nl: "📍 Richting",
    title_es: "📍 Dirección",
    title_zh: "方向",
    items: [
      { zh: "往左 / 往右。", py: "Wǎng zuǒ / Wǎng yòu.", nl: "Naar links / naar rechts.", es: "A la izquierda / a la derecha." },
      { zh: "直走。", py: "Zhí zǒu.", nl: "Rechtdoor.", es: "Recto." },
      { zh: "在哪里?", py: "Zài nǎlǐ?", nl: "Waar is het?", es: "¿Dónde está?" },
      { zh: "附近有地铁站吗?", py: "Fùjìn yǒu dìtiě zhàn ma?", nl: "Is er een metrostation in de buurt?", es: "¿Hay estación de metro cerca?" },
    ],
  },
];
