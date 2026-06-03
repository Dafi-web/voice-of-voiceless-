export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ti', label: 'ትግርኛ' },
  { code: 'am', label: 'አማርኛ' },
]

const en = {
  nav: {
    about: 'About',
    truth: 'The truth',
    gallery: 'Gallery',
    stories: 'Share story',
    evidence: 'Evidence',
    contact: 'Contact',
    speakUp: 'Speak up',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    leadSecondary:
      'In Tigray, Ethiopia, genocide and sexual violence were hidden from the world. {owner} built this platform so those stories are heard — and justice can follow.',
    ourMission: 'Our mission',
    seeEvidence: 'See the evidence',
    pillarMission: 'Our mission',
    pillarTruth: 'The truth',
    pillarGallery: 'Gallery',
  },
  about: {
    title: 'Our mission',
    subtitle: '{siteName} — founded {date} by {owner}.',
    founderLabel: 'Founder · {date}',
    founderRole: 'Founder · {siteName}',
    cards: [
      {
        title: 'Stories unheard',
        text: 'We platform narratives that are ignored, hidden, or denied — starting with survivors in Tigray.',
      },
      {
        title: 'Visuals & evidence',
        text: 'Through photographs, testimony, and documentation, silence becomes a visible record.',
      },
      {
        title: 'Awareness & action',
        text: 'We turn empathy into demand for truth, accountability, and justice under international law.',
      },
    ],
  },
  truth: {
    title: 'Genocide and sexual violence in Tigray',
    subtitle:
      'What governments tried to hide — documented by survivors, investigators, and international media.',
    p1: 'The war in Tigray was not only a military conflict. It was an attack on an entire people — with genocide, mass atrocities, and systematic sexual violence against women and girls used as tools of war. Officials downplayed it. Media was blocked. We publish the truth here.',
    p2: 'Rape was not a side effect — it was a strategy. Survivors report being targeted because of their ethnicity, because they were women, because destroying them destroyed their families and communities. That is a crime against humanity.',
    callout:
      'Genocide and sexual violence cannot be erased by silence. They must be named, recorded, and prosecuted — for every survivor in Tigray who was denied justice.',
    facts: [
      {
        title: 'Genocide against Tigrayans',
        text: 'Mass killings, starvation, and deliberate destruction of Tigrayan people and culture — crimes the Ethiopian government and allies denied or minimized.',
      },
      {
        title: 'Rape and sexual violence as weapons',
        text: 'Women and girls were raped, gang-raped, and sexually tortured by soldiers and militias. Sexual violence was used to humiliate, terrorize, and break communities — not isolated acts, but a pattern of war.',
      },
      {
        title: 'Information deliberately hidden',
        text: 'Journalists expelled, phone lines cut, aid blocked, and official narratives pushed while survivors could not speak. The world was kept from knowing the full scale of genocide and abuse.',
      },
      {
        title: 'Survivors abandoned',
        text: 'Women left with trauma, injury, and stigma — without medical care, justice, or protection. Perpetrators have not been held accountable.',
      },
    ],
  },
  gallery: {
    title: 'Evidence gallery',
    subtitle: 'Photographs and videos — proof the world cannot ignore. Leave a comment on any item.',
    warning: 'These images depict war injuries and trauma. Viewer discretion advised.',
    video: 'Video',
    readReport: 'Read report',
    source: 'Source',
    viewSource: 'View source →',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    mediaViewer: 'Media viewer',
  },
  comments: {
    add: 'Add a comment',
    count: '{n} comment',
    countPlural: '{n} comments',
    hide: 'Hide comments',
    heading: 'Comments',
    posted: 'Comment posted.',
    submitError: 'Could not submit. Try again later.',
    retry: 'Retry',
    loading: 'Loading…',
    empty: 'No comments yet. Be the first.',
    namePlaceholder: 'Your name (optional)',
    textPlaceholder: 'Share your thoughts…',
    post: 'Post comment',
    sending: 'Sending…',
    anonymous: 'Anonymous',
  },
  justice: {
    title: 'Justice is the goal',
    subtitle: 'Hiding crimes protects no one. Exposing them is the beginning — prosecution is the end.',
    text: 'Justice means survivors heard, evidence secured, and leaders held accountable under Ethiopian and international law — including for conflict-related sexual violence.',
    steps: ['Truth on the record', 'Evidence preserved', 'Perpetrators identified', 'Justice pursued'],
  },
  shareStory: {
    title: 'Share your story',
    subtitle:
      'Survivors of sexual violence during and after war in Tigray deserve to be heard. You choose how much to share and whether your name appears.',
    warning:
      'This section discusses sexual violence during and after war. Only proceed if you feel able. You may stop at any time.',
    success:
      'Thank you. Your testimony was sent securely to the admin team for review. It will not be published without your consent.',
    publication: 'Publication preference',
    optAnonymous: 'Anonymous — do not publish my name',
    optPseudonym: 'Use a pseudonym only',
    optNamed: 'I consent to using my real name',
    pseudonym: 'Pseudonym (if applicable)',
    pseudonymHint: 'Only used if you selected pseudonym above.',
    location: 'Approximate location and time period',
    locationHint: 'e.g. town, year — only what you are comfortable sharing.',
    testimony: 'Your testimony',
    testimonyHint: 'Write in your own words. There is no minimum length.',
    consent: 'Consent',
    consentText:
      'I understand this testimony may be reviewed for documentation and potential legal use, and I consent to secure handling of my submission.',
    submit: 'Submit testimony',
    sending: 'Sending…',
    error: 'Could not send. Please try again or use the contact form.',
  },
  evidence: {
    title: 'Submit evidence',
    subtitle: 'Help document the truth for future accountability. Every submission is reviewed confidentially.',
    successTitle: 'Thank you — we received your submission',
    successText:
      'The admin team will review your evidence and any files you uploaded. We do not publish material without verification and consent.',
    submitAnother: 'Submit another item',
    howItWorks: 'How it works',
    whatYouCanUpload: 'What you can upload',
    uploadList: [
      'Photos and videos (JPG, PNG, MP4, etc.)',
      'PDF documents and reports',
      'Text files and official records',
      'Up to 5 files, 50 MB each',
    ],
    privacy:
      'Your safety comes first. You may submit anonymously. We do not publish evidence without verification and consent.',
    typeLegend: 'Type of evidence',
    typeRequired: 'Please choose a type of evidence.',
    descriptionLegend: 'Description',
    descriptionHint:
      'Describe what the evidence shows, when and where it relates to, and who is involved if known.',
    descriptionPlaceholder: 'Write as much detail as you are comfortable sharing…',
    descriptionRequired: 'Please add a description of the evidence.',
    filesLegend: 'Upload files',
    optional: '(optional)',
    filesHint: 'Photos, videos, PDFs, or documents. Maximum 5 files, 50 MB each.',
    filesNote: 'Notes about files',
    filesNotePlaceholder: 'e.g. date taken, location, or context for the files above',
    contactLegend: 'Contact email',
    contactHint: 'Leave blank to remain completely anonymous.',
    submit: 'Submit evidence securely',
    uploading: 'Uploading…',
    maxFiles: 'You can upload up to 5 files at a time.',
    submitError: 'Could not send. Please try again or use the contact form below.',
    steps: [
      { title: 'Choose type', text: 'Select what kind of material you are submitting.' },
      { title: 'Describe it', text: 'Include dates, places, and context when you can.' },
      { title: 'Upload files', text: 'Photos, videos, PDFs, or documents (optional, up to 5 files).' },
      { title: 'Send securely', text: 'Optional email for follow-up — or stay anonymous.' },
    ],
    types: [
      { id: 'Witness testimony', label: 'Witness testimony', desc: 'First-hand account of what you saw or experienced' },
      { id: 'Medical or forensic record', label: 'Medical / forensic', desc: 'Clinical or expert documentation' },
      { id: 'Photograph or video', label: 'Photo or video', desc: 'Images or footage you lawfully possess' },
      { id: 'Official document', label: 'Official document', desc: 'Reports, orders, or government records' },
      { id: 'Communication (messages, reports)', label: 'Messages & reports', desc: 'Written or digital communications' },
      { id: 'Other', label: 'Other', desc: 'Another type of material' },
    ],
  },
  contact: {
    title: 'Get in touch',
    subtitle: 'Send a message, tip, or request. Rahwa reviews every submission.',
    cardText: 'Every message helps build the record. We treat sensitive information with care.',
    name: 'Name *',
    email: 'Email *',
    type: 'Type',
    typeContact: 'General message',
    typeRequest: 'Request / report',
    subject: 'Subject *',
    message: 'Message *',
    send: 'Send message',
    sending: 'Sending…',
    error: 'Failed to send. Please try again.',
  },
  footer: {
    tagline: 'Transforming silence into awareness, empathy, and action',
  },
  brand: {
    tagline: 'Where silence becomes awareness, empathy, and action.',
    missionIntro:
      'Beyond Silence is a platform dedicated to stories that are often ignored, hidden, or left unheard.',
    missionBelief:
      'We believe every voice carries meaning, every experience deserves recognition, and every human story has the power to create understanding.',
    missionWork:
      'Through visuals, narratives, and creative expression, our mission is to create a space where silence is transformed into awareness, empathy, and action.',
    missionTigray:
      'This site documents the genocide and sexual violence in Tigray, Ethiopia — truths that governments tried to hide — and fights for justice for survivors.',
    founderNote:
      'Rahwa Kahsay Tesfamariam founded Beyond Silence in {date} to break the silence around atrocities in Tigray and stand with survivors who deserve to be heard.',
    founderGoals: [
      'Give voice to stories ignored, hidden, or left unheard',
      'Expose the truth governments hid about the Tigray genocide',
      'Document sexual violence used as a weapon of war against women and girls',
      'Transform silence into awareness, empathy, and action — and demand justice',
    ],
  },
}

const ti = {
  nav: {
    about: 'ብዛዕባ',
    truth: 'ሓቂ',
    gallery: 'ማዕከን ስእሊ',
    stories: 'ዓንቀጽካ ኣካፍል',
    evidence: 'መረጋገጺ',
    contact: 'ርክብ',
    speakUp: 'ቃልካ ምቕራብ',
    openMenu: 'መደብ መኸተ መኸፈቲ',
    closeMenu: 'መደብ መኸተ ዕጸው',
  },
  hero: {
    leadSecondary:
      'ኣብ ትግራይ ኢትዮጵያ፡ ጨካንን ጾታዊ ጥፍኣትን ካብ ዓለም ተሓቢኡ። {owner} እዚ መድረኽ ኣቐረበት ንኸይድሕን ኣይኮነን — ፍትሒ ክስምዕ ይግባእ።',
    ourMission: 'ተልእኾና',
    seeEvidence: 'መረጋገጺ ርአ',
    pillarMission: 'ተልእኾ',
    pillarTruth: 'ሓቂ',
    pillarGallery: 'ማዕከን',
  },
  about: {
    title: 'ተልእኾና',
    subtitle: '{siteName} — {date} ብ{owner} ተመስርተ።',
    founderLabel: 'መስራቲ · {date}',
    founderRole: 'መስራቲ · {siteName}',
    cards: [
      {
        title: 'ዘይተሰማዕ ጽሑፋት',
        text: 'ዝተሓሓዙ፡ ዝተሓብኡ ወይ ዝተኣሰሩ ዛንታታት ንምዝገብ ንሰርሕ — ካብ ትግራይ መራጸኛታት ጀሚርና።',
      },
      {
        title: 'ስእሊን መረጋገጺን',
        text: 'ብስእሊ፡ ቃል ኣረጋጽጊ፡ ሰነድ — ናይ ስቕታ ዝኾነ ጽሑፍ ናብ ርኡይ መዝገብ ይቕየር።',
      },
      {
        title: 'ግንዛብን ተግባርን',
        text: 'ሓቂ፡ ተጠያቒነት፡ ፍትሒ — ኣብ ኣድሚናዊ ሕጊ ንምድማዕ ንሰርሕ።',
      },
    ],
  },
  truth: {
    title: 'ጨካንን ጾታዊ ጥፍኣትን ኣብ ትግራይ',
    subtitle: 'መንግስታት ዝሓብእዎ ዝነበሩ — ብመራጸኛታት፡ ተመራምርቲ፡ ዓለማዊ መገናኛታት ዝተዘርግሐ።',
    p1: 'ኲናት ትግራይ ጥራይ ኣይኮነን። ኣብ ሓደ ህዝቢ ጥቃት — ጨካን፡ ዓቢ ጥፍኣት፡ ኣብ መንግስታዊ ጾታዊ ጥፍኣት — ኣብዚ መድረኽ ሓቂ ንዘርግሕ።',
    p2: 'ስደድ ጎናዊ ኣይኮነን — ስትራተጂ እዩ። መራጸኛታት ብህዝቢ፡ ብጾታ ተጠቒኦም ኣለዉ። እዚ ገበን ኣድሚ ኣሰባሳቢ እዩ።',
    callout: 'ጨካንን ጾታዊ ጥፍኣትን ብስቕታ ኣይጠፍእን። ክፍለጡ፡ ክመዝገቡ፡ ክቅጸሉ ኣለዎም — ንኹሉ መራጸኛ ትግራይ።',
    facts: [
      {
        title: 'ጨካን ኣብ ትግራይ',
        text: 'ብዙሕ ግድያ፡ ረሓብ፡ ኣብ ህዝቢ ትግራይን ባህልን ዝኸየደ ጥፍኣት — መንግስቲ ኢትዮጵያን ኣሕዋትን ዝከሰሩ።',
      },
      {
        title: 'ስደድን ጾታዊ ጥፍኣትን',
        text: 'ሰበ-ንስትን ጓልን ተዓጽዩ፡ ብዙሕ ተዓጽዩ፡ ጾታዊ ጭንቀት ተጸንዩ። ንማሕበረሰብ ንምስባር መሳርሒ ኮይኑ።',
      },
      {
        title: 'ሓበሬታ ተሓቢኡ',
        text: 'ጋዜታዊያን ተወጽኡ፡ መስመር ተቐሪጹ፡ ሓገዝ ተኸልከለ — ዓለም ምሉእ መጠን ጥፍኣት ኣይፈልጠን።',
      },
      {
        title: 'መራጸኛታት ተተወ',
        text: 'ሰበ-ንስት ብtrauma፡ ጉድኣት፡ stigma ተተወ — ሕክምና፡ ፍትሒ፡ ሓለዋ የልዎምን።',
      },
    ],
  },
  gallery: {
    title: 'ማዕከን መረጋገጺ',
    subtitle: 'ስእሊን ትዕይንትን — ዓለም ክጥሕዶ ዘይክእል ምስክር። ኣብ ነፍሲ ወከፍ ኣስተያየት ጽሑፍ።',
    warning: 'እዚ ስእሊ ጥፍኣት ኲናትን traumaን የርእዩ። ተመልከቲ ጥንቃቐ ይግበሩ።',
    video: 'ቪድዮ',
    readReport: 'ዘተዘርግሐ ሪፖርት',
    source: 'ምንጪ',
    viewSource: 'ምንጪ ርአ →',
    close: 'ዕጸው',
    previous: 'ዝሓለፈ',
    next: 'ቀጻሊ',
    mediaViewer: 'ኣሳይቲ',
  },
  comments: {
    add: 'ኣስተያየት ጽሑፍ',
    count: '{n} ኣስተያየት',
    countPlural: '{n} ኣስተያየታት',
    hide: 'ኣስተያየታት ሕብእ',
    heading: 'ኣስተያየታት',
    posted: 'ኣስተያየትካ ተዘርግሐ።',
    submitError: 'ኣይተላእከን። ጸኒሕካ ፈትን።',
    retry: 'ደጊምካ ፈትን',
    loading: 'ይጽዕን…',
    empty: 'ክሳብ ሕጂ ኣስተያየት የለን። ኣብ መጀመርታ ክትኸውን ትኽእል።',
    namePlaceholder: 'ስምካ (ኣማራጺ)',
    textPlaceholder: 'ሓሳብካ ኣካፍል…',
    post: 'ኣስተያየት ምዝገብ',
    sending: 'ይሰደድ…',
    anonymous: 'Anonymous',
  },
  justice: {
    title: 'ፍትሒ ዕላማና እዩ',
    subtitle: 'ገበን ምሕባእ ሓደን ኣይሕብን። ምጥራይ መጀመርታ — ክስ ናይ መወዳእታ።',
    text: 'ፍትሒ ማለት መራጸኛታት ምስማዕ፡ መረጋገጺ ምሕላው፡ ኣመራርሓ ተጠያቂ ምግባር — ኣብ ጾታዊ ጥፍኣት ኲናትን።',
    steps: ['ሓቂ ኣብ መዝገብ', 'መረጋገጺ ተሓሊዩ', 'ገበነኛታት ተፈልጡ', 'ፍትሒ ተኸቲሉ'],
  },
  shareStory: {
    title: 'ዓንቀጽካ ኣካፍል',
    subtitle: 'መራጸኛታት ጾታዊ ጥፍኣት ኣብ ኲናትን ድሕሪ ኲናትን ክስማዕ ኣለዎም። ክንደይ ክትካፍል ይግባእ።',
    warning: 'እዚ ክፋል ጾታዊ ጥፍኣት ኣብ ኲናት ይዛረብ። ብኽብረትካ ቀጽል።',
    success: 'የቐንየልና። ዓንቀጽካ ብደህንነት ተላኢኹ። ብእስክሓትካ ዘይኮነስ ኣይንዘርግሕን።',
    publication: 'ኣብ ምትእትታው',
    optAnonymous: 'Anonymous — ስሜ ኣይትዘርግሑ',
    optPseudonym: 'ብስም ምትክ ጥራይ',
    optNamed: 'ብሓቀኛ ስሜ ክትዘርግሑ እስማማ',
    pseudonym: 'ስም ምትክ',
    pseudonymHint: 'ኣብ ላዕሊ pseudonym እንተመረጽካ ጥራይ ይውዕል።',
    location: 'ቦታን ግዜን',
    locationHint: 'ንኣብነት ከተማ፡ ዓመት — ክንደይ ዝኾነካ።',
    testimony: 'ዓንቀጽካ',
    testimonyHint: 'ብናይካ ቃላት ጽሑፍ። ንኡስ ርዝመት የለን።',
    consent: 'ስምምዕ',
    consentText: 'ዓንቀጽዚ ንሰነድን ሕጋዊ ኣገልግሎትን ክቕረብ እየ ብደህንነት ክዕደግ እየ።',
    submit: 'ዓንቀጽ ምልኣኽ',
    sending: 'ይሰደድ…',
    error: 'ኣይተላእከን። ጸኒሕካ ፈትን ወይ ቅድሚ ርክብ መደብ ተጠቐም።',
  },
  evidence: {
    title: 'መረጋገጺ ኣእቱ',
    subtitle: 'ሓቂ ንዝክሪ ተጠያቒነት ንምዝገብ ሓግዝ። ኩሉ ኣእቱነት ብምስጢር ይቖመ።',
    successTitle: 'የቐንየልና — ኣእቱነትካ ተቐቢልና',
    successText: 'መረጋገጺን ኣብራሪ ፋይላትን ክንርእይ ኢና። ብእስክሓትካ ዘይኮነስ ኣይንዘርግሕን።',
    submitAnother: 'ካልእ ኣእቱ',
    howItWorks: 'ከመይ ጌርካ',
    whatYouCanUpload: 'ክትሰድድ ዝኽእል',
    uploadList: [
      'ስእሊን ቪድዮን (JPG, PNG, MP4…)',
      'PDF ሰነዳት',
      'ጽሑፋትን ኣብያተ-መንግስትን',
      'ክሳድ 5 ፋይል፡ 50 MB',
    ],
    privacy: 'ደህንነትካ ቀዳማይ እዩ። Anonymous ክትኸውን ትኽእል።',
    typeLegend: 'ዓይነት መረጋገጺ',
    typeRequired: 'ዓይነት መረጋገጺ ምረጽ።',
    descriptionLegend: 'መግለጺ',
    descriptionHint: 'እንታይ እንዳርእይ፡ ከመይ ግዜ/ቦታ፡ ተሳተፍቲ መን እዮም።',
    descriptionPlaceholder: 'ክንደይ ዝኾነካ ዝርዝር ጽሑፍ…',
    descriptionRequired: 'መግለጺ መረጋገጺ ጽሑፍ።',
    filesLegend: 'ፋይል ስደድ',
    optional: '(ኣማራጺ)',
    filesHint: 'ስእሊ፡ ቪድዮ፡ PDF። ክሳድ 5 ፋይል፡ 50 MB።',
    filesNote: 'ብዛዕባ ፋይላት',
    filesNotePlaceholder: 'ንኣብነት ግዜ፡ ቦታ…',
    contactLegend: 'ኢመይል',
    contactHint: 'Anonymous ክትኸውን ባዶ ግደፍ።',
    submit: 'መረጋገጺ ብደህንነት ምልኣኽ',
    uploading: 'ይሰደድ…',
    maxFiles: 'ክሳድ 5 ፋይል ጊዜ ሓደ።',
    submitError: 'ኣይተላእከን። ጸኒሕካ ፈትን።',
    steps: [
      { title: 'ዓይነት ምረጽ', text: 'እንታይ ዓይነት ክትሰድድ ምረጽ።' },
      { title: 'ግለጽ', text: 'ግዜ፡ ቦታ፡ ኣገባብ ጽሑፍ።' },
      { title: 'ፋይል ስደድ', text: 'ስእሊ፡ PDF… (ኣማራጺ፡ 5).' },
      { title: 'ብደህንነት ስደድ', text: 'ኢመይል (ኣማራጺ) — Anonymous ትኽእል።' },
    ],
    types: [
      { id: 'Witness testimony', label: 'ዓንቀጽ ምስክር', desc: 'ብናይ ርእይቶ ኣጋጣሚ' },
      { id: 'Medical or forensic record', label: 'ሕክምና / forensic', desc: 'ሕክምናዊ ወይ ኣሰናዒ ሰነድ' },
      { id: 'Photograph or video', label: 'ስእሊ / ቪድዮ', desc: 'ስእሊ ወይ ትዕይንት' },
      { id: 'Official document', label: 'ኣብያተ-መንግስት ሰነድ', desc: 'ሪፖርት፡ ትእዛዝ' },
      { id: 'Communication (messages, reports)', label: 'መልእኽትን ሪፖርትን', desc: 'ዲጂታል ወይ ጽሑፋዊ' },
      { id: 'Other', label: 'ካልእ', desc: 'ካልእ ዓይነት' },
    ],
  },
  contact: {
    title: 'ርክብ',
    subtitle: 'መልእኽቲ፡ ሓበሬታ፡ ሕቶ ስደድ። ራህዋ ኩሉ ትረኣ።',
    cardText: 'ኩሉ መልእኽቲ ንመዝገብ ይሕግዝ። ተዓጽቲ ሓበሬታ ብጥንቃቐ ንዕደግ።',
    name: 'ስም *',
    email: 'ኢመይል *',
    type: 'ዓይነት',
    typeContact: 'ሓፈሻዊ መልእኽቲ',
    typeRequest: 'ሕቶ / ሪፖርት',
    subject: 'ኣርእስቲ *',
    message: 'መልእኽቲ *',
    send: 'መልእኽቲ ስደድ',
    sending: 'ይሰደድ…',
    error: 'ኣይተላእከን። ጸኒሕካ ፈትን።',
  },
  footer: {
    tagline: 'ስቕታ ናብ ግንዛብ፡ ስምዒት፡ ተግባር',
  },
  brand: {
    tagline: 'ስቕታ ናብ ግንዛብ፡ ስምዒት፡ ተግባር ይቕየር።',
    missionIntro: 'Beyond Silence ንዝተሓሓዙ፡ ዝተሓብኡ ዛንታታት ዝተወሰነ መድረኽ እዩ።',
    missionBelief: 'ኩሉ ድምጺ ትርጉም ኣለዎ፡ ኩሉ ተመኩሮ recognition ይግበሮ፡ ኩሉ ዛንታ ፍልጠት ይፈጥር።',
    missionWork: 'ብስእሊ፡ ዛንታ፡ ፈጠራ — ስቕታ ናብ ግንዛብ፡ ስምዒት፡ ተግባር ንቕይር።',
    missionTigray: 'እዚ መድረኽ ጨካንን ጾታዊ ጥፍኣትን ኣብ ትግራይ — መንግስታት ዝሓብእዎ ሓቂ — ንፍትሒ ይቃለስ።',
    founderNote:
      'ራህዋ ካሕሳይ ተስፋማርያም Beyond Silence {date} መስርታ — ንመራጸኛታት ትግራይ ክስማዕ ንምቕራብ።',
    founderGoals: [
      'ዝተሓሓዙ ዛንታታት ክስማዕ',
      'ብትግራይ ጨካን ዝተሓብአ ሓቂ ክገልጽ',
      'ጾታዊ ጥፍኣት ከም መሳርሒ ኲናት ክመዝግብ',
      'ስቕታ ናብ ግንዛብ፡ ተግባር፡ ፍትሒ',
    ],
  },
}

const am = {
  nav: {
    about: 'ስለ እኛ',
    truth: 'እውነት',
    gallery: 'גלרይ',
    stories: 'ታሪክህን አጋራ',
    evidence: 'ማስረጃ',
    contact: 'ያግኙን',
    speakUp: 'ድምጽህን አሰማ',
    openMenu: 'ምናሌ መክፈት',
    closeMenu: 'ምናሌ መዝጋት',
  },
  hero: {
    leadSecondary:
      'በትግራይ ኢትዮጵያ፣ genocide እና ጾታዊ ጥፋት ከዓለም ተደበቀ። {owner} እነዚህን ታሪኮች እንዲሰሙ እና ፍትሕ እንዲከተል ይህን መድረክ መሰረተች።',
    ourMission: 'ተልእኮአችን',
    seeEvidence: 'ማስረጃ ይመልከቱ',
    pillarMission: 'ተልእኮ',
    pillarTruth: 'እውነት',
    pillarGallery: 'ጋለሪ',
  },
  about: {
    title: 'ተልእኮአችን',
    subtitle: '{siteName} — {date} በ{owner} ተመሠረተ።',
    founderLabel: 'FOUNDER · {date}',
    founderRole: 'FOUNDER · {siteName}',
    cards: [
      {
        title: 'ያልተሰማ ታሪኮች',
        text: 'የተሰረዙ፣ የተደበቁ ወይም የተካዱ ታሪኮችን እናቀርባለን — ከትግራይ survivors ጀምሮ።',
      },
      {
        title: 'ምስሎች እና ማስረጃ',
        text: 'በፎቶግራፍ፣ testimony እና documentation — silence ወደ visible record ይቀይራል።',
      },
      {
        title: 'ግንዛብ እና action',
        text: 'truth፣ accountability፣ justice — በ international law እናቀናብራለን።',
      },
    ],
  },
  truth: {
    title: 'Genocide እና ጾታዊ ጥፋት በትግራይ',
    subtitle: 'መንግስታት የ tried to hide — survivors፣ investigators፣ media documented.',
    p1: 'The war in Tigray military conflict ብቻ አልነበረም። Attack on entire people — genocide፣ atrocities፣ systematic sexual violence። We publish truth here.',
    p2: 'Rape side effect አልነበረም — strategy ነበር። Survivors by ethnicity፣ as women targeted። Crime against humanity.',
    callout: 'Genocide እና sexual violence በ silence cannot be erased። Named፣ recorded፣ prosecuted — for every Tigray survivor.',
    facts: [
      {
        title: 'Genocide against Tigrayans',
        text: 'Mass killings፣ starvation፣ destruction — Ethiopian government denied.',
      },
      {
        title: 'Rape and sexual violence as weapons',
        text: 'Women and girls raped፣ gang-raped፣ tortured — pattern of war.',
      },
      {
        title: 'Information deliberately hidden',
        text: 'Journalists expelled፣ phones cut፣ aid blocked — world kept from knowing.',
      },
      {
        title: 'Survivors abandoned',
        text: 'Trauma፣ injury፣ stigma — no medical care፣ justice፣ protection.',
      },
    ],
  },
  gallery: {
    title: 'Evidence gallery',
    subtitle: 'Photos and videos — proof the world cannot ignore. Leave a comment on any item.',
    warning: 'These images depict war injuries and trauma. Viewer discretion advised.',
    video: 'Video',
    readReport: 'Read report',
    source: 'Source',
    viewSource: 'View source →',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    mediaViewer: 'Media viewer',
  },
  comments: {
    add: 'Comment ይጻፉ',
    count: '{n} comment',
    countPlural: '{n} comments',
    hide: 'Comments hide',
    heading: 'Comments',
    posted: 'Comment ተለጠፈ።',
    submitError: 'Could not submit. Try again.',
    retry: 'Retry',
    loading: 'Loading…',
    empty: 'No comments yet. Be the first.',
    namePlaceholder: 'Your name (optional)',
    textPlaceholder: 'Share your thoughts…',
    post: 'Comment post',
    sending: 'Sending…',
    anonymous: 'Anonymous',
  },
  justice: {
    title: 'Justice is the goal',
    subtitle: 'Hiding crimes protects no one. Exposing them is the beginning — prosecution is the end.',
    text: 'Justice means survivors heard, evidence secured, and leaders held accountable.',
    steps: ['Truth on the record', 'Evidence preserved', 'Perpetrators identified', 'Justice pursued'],
  },
  shareStory: {
    title: 'Share your story',
    subtitle: 'Survivors deserve to be heard. You choose how much to share.',
    warning: 'This section discusses sexual violence. Only proceed if you feel able.',
    success: 'Thank you. Your testimony was sent securely.',
    publication: 'Publication preference',
    optAnonymous: 'Anonymous — do not publish my name',
    optPseudonym: 'Use a pseudonym only',
    optNamed: 'I consent to using my real name',
    pseudonym: 'Pseudonym',
    pseudonymHint: 'Only if pseudonym selected.',
    location: 'Location and time period',
    locationHint: 'e.g. town, year.',
    testimony: 'Your testimony',
    testimonyHint: 'Write in your own words.',
    consent: 'Consent',
    consentText: 'I consent to secure handling of my submission.',
    submit: 'Submit testimony',
    sending: 'Sending…',
    error: 'Could not send. Try again.',
  },
  evidence: {
    title: 'Submit evidence',
    subtitle: 'Help document the truth.',
    successTitle: 'Thank you — we received your submission',
    successText: 'Admin will review. We do not publish without consent.',
    submitAnother: 'Submit another',
    howItWorks: 'How it works',
    whatYouCanUpload: 'What you can upload',
    uploadList: ['Photos and videos', 'PDF documents', 'Text files', 'Up to 5 files, 50 MB each'],
    privacy: 'Your safety comes first. You may submit anonymously.',
    typeLegend: 'Type of evidence',
    typeRequired: 'Please choose a type.',
    descriptionLegend: 'Description',
    descriptionHint: 'Describe the evidence.',
    descriptionPlaceholder: 'Write detail…',
    descriptionRequired: 'Description required.',
    filesLegend: 'Upload files',
    optional: '(optional)',
    filesHint: 'Max 5 files, 50 MB each.',
    filesNote: 'Notes about files',
    filesNotePlaceholder: 'e.g. date, location',
    contactLegend: 'Contact email',
    contactHint: 'Leave blank to stay anonymous.',
    submit: 'Submit evidence',
    uploading: 'Uploading…',
    maxFiles: 'Up to 5 files at a time.',
    submitError: 'Could not send.',
    steps: [
      { title: 'Choose type', text: 'Select material type.' },
      { title: 'Describe it', text: 'Include dates and places.' },
      { title: 'Upload files', text: 'Optional, up to 5 files.' },
      { title: 'Send securely', text: 'Optional email or anonymous.' },
    ],
    types: [
      { id: 'Witness testimony', label: 'Witness testimony', desc: 'First-hand account' },
      { id: 'Medical or forensic record', label: 'Medical / forensic', desc: 'Clinical documentation' },
      { id: 'Photograph or video', label: 'Photo or video', desc: 'Images or footage' },
      { id: 'Official document', label: 'Official document', desc: 'Reports, records' },
      { id: 'Communication (messages, reports)', label: 'Messages & reports', desc: 'Communications' },
      { id: 'Other', label: 'Other', desc: 'Another type' },
    ],
  },
  contact: {
    title: 'Get in touch',
    subtitle: 'Send a message. Rahwa reviews every submission.',
    cardText: 'Every message helps build the record.',
    name: 'Name *',
    email: 'Email *',
    type: 'Type',
    typeContact: 'General message',
    typeRequest: 'Request / report',
    subject: 'Subject *',
    message: 'Message *',
    send: 'Send message',
    sending: 'Sending…',
    error: 'Failed to send.',
  },
  footer: {
    tagline: 'Transforming silence into awareness, empathy, and action',
  },
  brand: {
    tagline: 'Where silence becomes awareness, empathy, and action.',
    missionIntro: 'Beyond Silence is a platform for unheard stories.',
    missionBelief: 'Every voice carries meaning.',
    missionWork: 'Silence transformed into awareness, empathy, and action.',
    missionTigray: 'Documents genocide and sexual violence in Tigray — fights for justice.',
    founderNote: 'Rahwa Kahsay Tesfamariam founded Beyond Silence in December 2025.',
    founderGoals: [
      'Give voice to unheard stories',
      'Expose hidden truth about Tigray genocide',
      'Document sexual violence as weapon of war',
      'Transform silence into action and demand justice',
    ],
  },
}

// Improve Amharic gallery/comments/nav with proper translations
am.nav.gallery = 'የምስል ማዕከል'
am.nav.about = 'ስለ እኛ'
am.gallery.title = 'የማስረጃ ማዕከል'
am.gallery.subtitle = 'ፎቶዎች እና ቪዲዮዎች — ዓለም መሰረት ማይችልበት ማስረጃ። በማንኛውም ላይ አስተያየት ይተዉ።'
am.gallery.warning = 'እነዚህ ምስሎች የጦር ጉዳት እና trauma ያሳያሉ። ተመልካቾች ጥንቃቄ ይውሰዱ።'
am.comments.add = 'አስተያየት ጻፉ'
am.comments.count = '{n} አስተያየት'
am.comments.countPlural = '{n} አስተያየቶች'
am.comments.hide = 'አስተያየቶችን ደብቅ'
am.comments.heading = 'አስተያየቶች'
am.comments.posted = 'አስተያየትዎ ተለጠፈ።'
am.comments.empty = 'እስካሁን አስተያየት የለም። የመጀመሪያው ይሁኑ።'
am.comments.namePlaceholder = 'ስምዎ (አማራጭ)'
am.comments.textPlaceholder = 'ሐሳብዎን ያጋሩ…'
am.comments.post = 'አስተያየት ለጥፍ'
am.comments.sending = 'በመላክ ላይ…'
am.justice.title = 'ፍትሕ ዒላማنا ነው'
am.justice.subtitle = 'جرائمን መደበቅ ምንም አይጠብም።'
am.justice.text = 'ፍትሕ ማለት survivors heard፣ evidence secured፣ leaders accountable።'
am.justice.steps = ['እውነት በመዝገብ', 'ማስረጃ መጠበቅ', 'ወንጀለኞች መለየት', 'ፍትሕ መከታተል']
am.shareStory.title = 'ታሪክህን አጋራ'
am.shareStory.subtitle = 'በጦርነት ጊዜ እና بعد ጦርነት ጾታዊ ጥፋት መራጸኞች መስማት ይገባል።'
am.contact.title = 'ያግኙን'
am.contact.subtitle = 'መልእክት ይላኩ። Rahwa reviews every submission.'
am.contact.cardText = 'Every message helps build the record.'
am.contact.send = 'መልእክት ላክ'
am.evidence.title = 'ማስረጃ አስገባ'
am.hero.ourMission = 'ተልእኮአችን'
am.hero.seeEvidence = 'ማስረጃ ይመልከቱ'

export const translations = { en, ti, am }

export function interpolate(str, vars = {}) {
  if (typeof str !== 'string') return str
  return str.replace(/\{(\w+)\}/g, (_, key) => (vars[key] != null ? vars[key] : `{${key}}`))
}

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function translate(lang, key, vars) {
  const val = getNested(translations[lang], key) ?? getNested(translations.en, key) ?? key
  if (typeof val === 'string') return interpolate(val, vars)
  return val
}
