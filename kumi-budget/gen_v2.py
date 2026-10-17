import html, json, math, os, re

# One tier of the Kumi pilot budget. build_tiers.py runs this for tiers 0–3 and joins them into one page.
# Text markup used below:
#   ⟦0:text¦3:other⟧  picks the variant with the largest key at or below TIER (nothing if none fits);
#                     a variant from a higher tier than its line is highlighted in that tier's colour.
#   [2] or [2-2]      at the start of a bullet: shown from tier 2 (up to tier 2); highlighted as a tier-2 addition.
TIER = int(os.environ.get('TIER', '3'))
OUT = os.environ.get('OUT', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist', 'budget.html'))
PART = os.environ.get('PART')  # set by build_tiers.py: write only this tier's sheets
from doc_style import HEAD, paginate

FX = 1.55          # US$1 = A$1.55, same as the original proposal
RATE_DISC = 0.90   # team priced 10% below DFAT MRP
MGMT = 0.10
CONT = 0.15
# CUT: items shown struck through and left out of every total (used for a "platform only" view).
# Task codes (1.6, H1 …) plus: headsets, transport, allowance, travel, pilot_run, bridge.
CUT = {c for c in os.environ.get('CUT', '').split(',') if c}

# role: (name, DFAT discipline · level, DFAT MRP 2025-26)
DFAT = {
 "SE": ("Software Engineer", "B · Information Systems · Senior (L3)", 793),
 "SP": ("Speech Engineer", "B · IT Engineering · Senior (L3)", 793),
 "AI": ("AI Engineer", "B · IT Engineering · Senior (L3)", 793),
 "UX": ("UX/UI Designer, Illustrator & Content Developer", "B · Education · Middle (L2)", 611),
 "QA": ("QA / Test Engineer & Pilot Support", "A · Software & technical support · Middle (L2)", 572),
 "PL": ("Pijin Linguist (local)", "B · Education · Entry (L1)", 424),
 "PM": ("Project Manager", "C · Project Management · Middle (L2)", 607),
 "TC": ("Grade 3 Teacher (local)", "B · Education · Entry (L1)", 424),
 "ED": ("Education Specialist", "B · Education · Senior (L3)", 793),
}
ROLE_ORDER = ["SE","SP","AI","UX","QA","PL","TC","ED","PM"]
HOURS = 8
HOURLY = {k: round(v[2]*RATE_DISC/HOURS) for k, v in DFAT.items()}
RATE = {k: HOURLY[k]*HOURS for k in DFAT}
LANG = "Tok Pisin"
RESP = {"SE":"Builds the Kumi desktop app and cloud backend. Technical lead for architecture, offline sync, security, builds and installation.",
        "SP":"⟦0:Builds Kumi’s keyword listening: a small model on the school computer that hears a few common words in English and Tok Pisin.¦2:Builds how Kumi speaks and listens: Kumi’s Tok Pisin voice, English speech recognition, and both running on the school computers.¦3:Builds how Kumi listens and speaks: Tok Pisin and English speech recognition tuned for children, Kumi’s Tok Pisin voice, and both models running on the school computers.⟧",
        "AI":"⟦1:Builds Kumi’s intelligence: the Claude integration and its child-safety layer, the adaptive learning engine and the offline help bank, and analyses the pilot results.¦2:Builds Kumi’s intelligence: the Claude integration and its child-safety layer, the adaptive learning engine, the offline help bank, Kumi’s conversation and the weekly quality review.⟧",
        "UX":"Designs the app and Kumi’s PNG-themed look. Turns the Grade 3 syllabus into ⟦0:20¦3:30⟧ animated lessons, the question bank and the benchmark tests, and leads the curriculum review.",
        "QA":"Tests every release, online and offline. First-line support for the school during the pilot.",
        "PL":"⟦0:Builds the Tok Pisin glossary, verifies the AI translation of lessons and app text, and reviews content for cultural fit.¦2:Runs the voice actor sessions, verifies the AI translation of lessons and app text, checks Kumi’s narration, and reviews content for cultural fit.¦3:Writes the speech scripts and runs the recording sessions, verifies the AI translation of lessons and app text, checks Kumi’s narration, and reviews content for cultural fit.⟧ The local on-call contact in Port Moresby during the pilot.",
        "TC":"A practising PNG Grade 3 teacher. Co-writes and reviews every lesson and the benchmark tests against the syllabus.",
        "ED":"An independent, experienced Grade 3 educator. Signs off the lessons and benchmark tests before launch.",
        "PM":"Runs delivery, milestones and reporting to the investor. Owns safeguarding and data protection, school coordination, and the pre- and post-pilot reports."}
MARKET = {"SE":"$1,300–$1,800 (senior full-stack)","AI":"$1,300–$1,900 (mid AI/LLM engineer)",
          "SP":"$1,300–$1,900 (mid AI/LLM engineer; no separate speech benchmark)",
          "UX":"$850–$1,300 (mid UX/UI)","QA":"$800–$1,200 (mid QA)","PM":"$900–$1,300 (junior tech program manager)"}

EP = {
 "1":("Phase 1","Project setup & requirements","Weeks 1–3"),
 "A":("Phase 2 · Build","A. Application foundation","Weeks 4–12"),
 "B":("Phase 2 · Build","⟦0:B. Tok Pisin glossary¦2:B. Kumi’s voice and English listening¦3:B. Kumi speech recognition & voice assistant system⟧","Weeks 4–17"),
 "C":("Phase 2 · Build","C. Grade 3 curriculum content — ⟦0:numeracy & literacy¦3:numeracy, literacy & personal development⟧","Weeks 4–17"),
 "D":("Phase 2 · Build","⟦0:D. Adaptive learning (added in Tier 1)¦1:D. AI engine & adaptive learning⟧","Weeks 6–17"),
 "E":("Phase 2 · Build","E. Class dashboard & benchmark tests","Weeks 12–15"),
 "3":("Phase 3","Testing & pilot readiness","Weeks 9–18"),
 "4":("Phase 4","Installation & teacher training (on-site)","Weeks 19–20"),
 "5":("Phase 5","Pilot term — support & evidence","Weeks 21–31"),
 "P":("Across phases 1–4","Project management","Weeks 1–20"),
}

# (stage, code, first tier, "title|bullet|bullet", allocation: [(role, weeks)] or {from tier: [(role, weeks)]})
W = [
 ("1","1.1",0,"Project mobilisation and setup|Kick-off with the project team and the investor|Team induction to the Kumi concept, learning goals and delivery plan|Project governance, communication and progress-reporting plan|Gathering educational resources: the PNG Grade 3 syllabus, textbooks and teaching materials, and a plan for collecting lesson content|Content and assessment plan: ⟦0:20 lessons mapped to learning outcomes across numeracy and literacy¦3:30 lessons mapped to learning outcomes across numeracy, literacy and personal development⟧, and what the benchmark tests will measure",[("PM",0.5),("UX",1.0)]),
 ("1","1.2",0,"Requirements engineering|Elicitation: workshops and interviews with the investor, the project team and education specialists, and a review of the PNG Grade 3 curriculum|Specification: a Software Requirements Specification (SRS) covering functional requirements (what Kumi does for children and teachers) and non-functional requirements (performance on low-spec computers, offline operation, security, privacy, accessibility and reliability)|Validation and verification: requirements reviewed with the investor to confirm they are accurate, complete and achievable|Management: an agreed requirements baseline, with change control for anything that changes after sign-off",[("PM",0.5),("SE",0.5)]),
 ("1","1.3",0,"System architecture design|Technology stack for the desktop app, the cloud backend and the AI services|Database design and data model for student profiles, progress and learning records|Offline storage and synchronisation design|⟦1:Integration design for Claude’s API and Kumi’s narration¦2:Integration design for Claude’s API, speech recognition and Kumi’s voice⟧|Security and privacy by design, with hosting in Australia|Development set-up: code repository, automated builds, test environments, cloud and service accounts",[("SE",1.0)]),
 ("1","1.4",0,"Detailed UX/UI design|User journeys for children and teachers|Wireframes for every screen|Kumi character and PNG-themed design system|[2] Voice screens: a clear listening cue, Kumi’s spoken replies and tap-to-answer|Clickable prototype, reviewed with the investor",{0:[("UX",0.5)],2:[("UX",1.0)]}),
 ("1","1.5",0,"Child safeguarding and data protection|Child-protection risk assessment|Code of conduct signed by all personnel|Criminal record and reference checks for anyone who will work with children|Parent and guardian consent process for the pilot⟦2:, including voice interaction⟧, and for the comparison class’s tests|Privacy and data-handling plan⟦1:, telling parents that Kumi’s live voice service (ElevenLabs) is based overseas¦2:, telling parents that Kumi’s English voice service is based overseas⟧|Incident-reporting procedure in line with DFAT’s Child Protection Policy and PNG’s Lukautim Pikinini Act 2015",[("PM",0.5)]),
 ("1","1.6",0,"School agreement, approvals and site survey|Pilot school and a comparison class chosen in Port Moresby|School agreement: lab time for ⟦0:2¦3:3⟧ hours per child each week, the teacher’s time, the comparison class and the term dates|Department of Education approval for the pilot and for using the Grade 3 syllabus and textbooks|Site survey by the linguist: every lab computer’s model, memory and Windows version, plus internet speed, power and admin access|Survey results feed the architecture (1.3); computers below spec are flagged before the build starts",[("PM",1.0),("PL",0.5)]),

 ("A","A1",0,"Application framework|Built on the existing Kumi prototype (React), packaged as a Windows app, so screens already built are reused|Application shell and navigation, built from the Phase 1 designs, with design assurance from the designer|Interface components in Tok Pisin and English, built to usability heuristics for young learners|Lesson engine: narration, animations, activity and question types, with answer capture|Performance tuning for older, low-specification school computers|[1] Integration points for the adaptive learning engine and the AI curation (stream D)|[2] Integration points for the voice assistant (stream B)",{0:[("UX",0.5),("SE",2.0)],1:[("UX",0.5),("SE",2.5)]}),
 ("A","A2",0,"Student profile management|Individual account for every student|Individual sign-in lock for each student (picture and PIN), so no student can access another student’s profile|Language choice: each student picks Tok Pisin or English and can switch at any time; screens, lessons and Kumi all follow that choice⟦1: (Kumi’s voice is English; Tok Pisin is shown on screen)¦2:⟧|Profiles held in the central student database, with every interaction captured for curation and reporting",[("SE",0.5)]),
 ("A","A3",0,"Online and offline modes, with data synchronisation|Offline-first local database on each computer: every interaction is written to the computer first, and a power cut mid-lesson loses nothing|Every interaction saved as a record with its own ID, so sending it twice never creates a duplicate|Several students sharing one computer, with every record tied to the right child|Sync queue that retries automatically when the connection returns, sending a long offline backlog in small batches over a slow link|The server rebuilds each child’s progress from their records, so two computers can never overwrite each other’s data|⟦0:Connectivity detection, so syncing starts as soon as the connection returns¦1:Connectivity detection that switches Kumi between online and offline help automatically (built in stream D)⟧|Built and tested against simulated outages and power cuts; formal resilience tests in Phase 3",[("SE",3.0)]),
 ("A","A4",0,"Lesson sync|Lessons delivered from the cloud content store and cached on each computer|New and updated lessons re-sync automatically, with no reinstall needed",[("SE",0.5)]),
 ("A","A5",0,"Cloud backend and central database|Hosted in Australia (AWS Sydney)|Central student database and interaction data store|Secure API for app synchronisation, AI curation and reporting|Role-based access for teachers and the project team",[("SE",1.0)]),
 ("A","A6",0,"Security, backup and monitoring|Encryption at rest and in transit|Daily backups, with data retention and deletion under the safeguarding plan|Remote crash and error monitoring, so issues at the school are found and fixed without a site visit",[("SE",0.5)]),
 ("A","A7",0,"Packaging, installation and updates|Code-signed Windows installer (.exe)|Offline installation from USB, with lessons preloaded|Automatic updates when online",[("SE",0.5)]),

 ("B","B1",2,"Speech recognition foundation|The full listening path working end to end: microphone, push-to-talk, voice detection, recognition and Kumi’s reply|Built on Whisper, an open-source speech model (MIT licence) that can be trained further and used commercially|Runs on a school-specification Windows computer from day one, so speed problems show up early|A working English voice loop to test with from week 5",[("SP",1.0)]),
 ("B","B2",0,"⟦0:Tok Pisin glossary and style guide¦3:Tok Pisin script development and glossary⟧|[3] About 10,000 short Tok Pisin sentences, drafted with AI help and checked by the linguist, covering every sound in the language|[3] Curriculum vocabulary, numbers, names and common classroom phrases included|Built from Sing Singh AI’s existing English–Tok Pisin dictionary: agreed spellings captured in a Tok Pisin glossary and style guide, also used for lesson translation",{0:[("PL",0.5)],3:[("PL",2.0)]}),
 ("B","B3",2,"⟦2:Voice actor recording¦3:Adult speech data collection⟧|[3] 20 adult Tok Pisin speakers, women and men from different regions, 2.5 hours each: 50 hours of recording sessions, giving about 30 hours of clean speech once pauses and retakes are removed|Kumi’s voice actor records about 6 hours in Tok Pisin and 1 hour in English, in the same voice|Voice actor engaged under a written contract: informed consent, use limited to Kumi, and paid usage rights|Recorded on a portable studio kit, with written consent and usage rights from every speaker",{2:[("PL",0.5)],3:[("PL",2.0)]}),
 ("B","B4",3,"Training, validation and test datasets|Every recording checked against its script, with misreads cut or corrected|Audio and text aligned word by word|Data split by speaker into training (80%), validation (10%) and test (10%) sets, so the model is always tested on voices it has never heard|Existing Tok Pisin speech corpus (IARPA Babel, about 200 hours of telephone conversation) converted to the project’s audio format and to the glossary’s spellings (B2)|Corpus licence confirmed in week 1. If it does not allow commercial use, the model is trained on the project’s own recordings only, and the accuracy target is set to match",[("PL",1.5),("SP",1.0)]),
 ("B","B5",3,"Tok Pisin speech recognition model|Pronunciation lexicon: Tok Pisin pronunciation rules, with hand-checked entries for English loanwords, numbers and names|Whisper (small model, about 250 million parameters) trained on the corpus and the new recordings: one model for Tok Pisin, English and mixed sentences|About 15–20 training runs comparing data mixes and settings: about 200 GPU-hours on rented NVIDIA H100s|Child-voice tuning: adult recordings shifted towards children’s pitch and pace|Classroom noise mixed into training, so recognition holds up in a busy room|Answer-aware recognition: Kumi listens for the answers each activity expects, which sharply improves accuracy on short replies",[("PL",0.5),("SP",4.0)]),
 ("B","B6",2,"Kumi’s Tok Pisin voice|The voice actor’s 6 hours cut into sentences, aligned and checked|[2-2] Pronunciation lexicon: Tok Pisin pronunciation rules, with hand-checked entries for English loanwords, numbers and names|Text preparation so numbers, dates, names and English loanwords are spoken correctly, using ⟦2:the lexicon¦3:the B5 lexicon⟧ rather than espeak-ng, whose GPL licence does not suit a commercial app|Open-source Piper (MIT licence) trained from an existing voice onto the actor’s recordings: about 150 GPU-hours on rented NVIDIA H100s, over several rounds|Native-speaker listening checks between rounds|Kumi’s English voice cloned from the same actor’s English recording through ElevenLabs, with the actor verifying their own voice",{2:[("SP",2.5),("PL",0.5)],3:[("SP",2.5)]}),
 ("B","B7",2,"Speech on the school computers|⟦2:The English speech model and Kumi’s Tok Pisin voice¦3:Both speech models⟧ compressed to 8-bit and run on the computer’s processor, with no graphics card and no internet|Target: Kumi starts replying within about 2 seconds of a child finishing speaking, on an 8 GB machine|Memory and processor use measured with the full app running, so speech and lessons never compete for the machine|A cloud copy kept as a fallback for any computer that struggles",[("SP",1.5)]),
 ("B","B8",2,"Voice companion conversation|Talks with each child through every lesson: encourages, motivates and helps clear up doubts|Turn-taking that suits young children: push-to-talk, a clear listening cue, then Kumi’s spoken reply|⟦2:Children answer by voice in English, or by tap in Tok Pisin; Kumi speaks in the student’s chosen language¦3:Speaks in the student’s chosen language, and still understands a child who mixes Tok Pisin and English⟧|If unsure, Kumi asks again or offers tap-to-answer|Replies stream as they are generated, and common phrases are pre-recorded, so Kumi answers quickly",[("AI",1.5)]),
 ("B","B9",2,"Accuracy testing and evaluation|⟦2:English recognition measured on recordings the model has never heard, against the targets agreed in Phase 1¦3:Measured on the held-back test set, on voices the model has never heard, against the targets agreed in Phase 1⟧|[3] Two measures: how often Kumi correctly recognises a child’s answer in an activity, and the word error rate on open speech|Listening tests of Kumi’s voice with native Tok Pisin speakers|Error report: which sounds, words and speakers fail, and what fixes them",{2:[("SP",0.5),("PL",0.5)],3:[("SP",1.0),("PL",0.5)]}),

 ("C","C1",0,"⟦0:20 one-hour lessons¦3:30 one-hour lessons⟧|⟦0:10 lessons each in numeracy and literacy¦3:10 lessons each in numeracy, literacy and personal development⟧, from the PNG Grade 3 syllabus and textbooks|One lesson per subject per week: ⟦0:2¦3:3⟧ hours of learning per child each week across the 10-week term|Each hour follows one lesson template: ⟦0:an illustrated¦1:a narrated, illustrated⟧ explanation with worked examples, then guided activities and practice⟦1: that Kumi adapts to the child⟧|Drafted with AI help, then written up by the content developer: about 1.5 days per lesson|Co-written and reviewed with a practising PNG Grade 3 teacher, against the Grade 3 syllabus|Inclusive by design: language, examples and pictures suited to 8-year-olds in PNG; balanced representation of girls and boys and of different regions; accessible to children from marginalised groups and children with disabilities; sustainability themes included where they fit",{0:[("UX",6.0),("TC",2.0),("PM",0.5),("PL",0.5)],3:[("UX",9.0),("TC",3.0),("PM",0.5),("PL",1.0)]}),
 ("C","C2",0,"Practice question bank|About 40 approved questions per lesson, around ⟦0:800¦3:1,200⟧ in total|A graded range of difficulty, so practice steps up or down with each child|[1] Every question tagged to the Grade 3 skill it practises, for the adaptive learning engine (D2)|A mix of question types: multiple choice, matching, drag-and-drop⟦2: and spoken answers⟧|Drafted with AI support and reviewed by the content developer before approval|[1] The controlled pool the AI curation draws from; children only ever see approved questions",{0:[("UX",1.0)],3:[("UX",1.5)]}),
 ("C","C3",0,"Illustrations and animations|PNG-themed scenes, names, places and everyday objects that children recognise|Designer-made and AI-generated images, finished by the designer and animated for the lesson player",{0:[("UX",1.0)],3:[("UX",1.5)]}),
 ("C","C4",0,"Tok Pisin translation⟦1: and English narration¦2: and narration⟧|Lessons, questions and app text (about ⟦0:55,000¦3:80,000⟧ words) translated by AI, using the glossary (B2) and Sing Singh AI’s English–Tok Pisin dictionary|[1-1] English narration and spoken instructions generated automatically with ElevenLabs, in Kumi’s voice|[2] Narration and spoken instructions generated automatically with Kumi’s voice models (stream B)|The linguist verifies every lesson’s translation⟦2: and listens through its narration⟧ before release",{0:[("PL",2.0)],3:[("PL",3.0)]}),

 ("D","D1",1,"Cloud AI engine: Claude (online)|Kumi’s ⟦1:live help¦2:conversation⟧ when the computer is online: explanations, encouragement, answers to a child’s questions, and curation decisions|Claude used through Amazon Bedrock’s Australian region, so AI requests are processed in Australia|Kumi’s persona and teaching style written as tested prompts for each lesson and activity type|Kept to the current lesson and the approved question bank: Kumi explains and encourages, but never invents questions or answers|Curation decisions (next activity, difficulty, when to review) returned in a fixed format and checked by the adaptive learning engine (D2)|Child-safety layer on every input and output, in English and Tok Pisin: topic limits, a screening check, a Tok Pisin word list from the linguist and a safe fallback reply; anything concerning is flagged to the teacher under the safeguarding plan|Designed to the Privacy Act 1988 (Cth) and the Australian Privacy Principles: no names or personal identifiers are sent to Claude, and API data is not used to train Anthropic’s models|A test set of about 300 scripted child conversations in both languages, re-run after every prompt change|Prompt caching and per-child usage limits keep running costs predictable",[("AI",2.5)]),
 ("D","D2",1,"Adaptive learning engine|Skill map: every lesson and question linked to the Grade 3 skills it practises (tagged as the question bank is written, C2)|A mastery estimate for each child and skill, updated after every answer, using Bayesian Knowledge Tracing, a well-established method that can be explained to teachers|Starting settings taken from published studies, then refitted on the pilot’s own data after the term|Picks the next activity and its difficulty from the child’s current mastery, and brings weak skills back for review at spaced intervals|Teachers can see why Kumi chose an activity, and override it|Runs on the computer, so it works the same online and offline; the cloud copy updates on sync|Tested on simulated learners (fast, slow, guessing, stuck) before launch",[("AI",2.0)]),
 ("D","D3",1,"Offline help bank|[1-2] When the internet drops, Kumi keeps helping from about 600 approved lines: a hint and a worked explanation for each lesson section, feedback on common mistakes, and encouragement|[3] When the internet drops, Kumi keeps helping from about 900 approved lines: a hint and a worked explanation for each lesson section, feedback on common mistakes, and encouragement|Drafted by Claude at build time from the approved lessons, checked by the content developer (English) and the linguist (Tok Pisin), and voiced in Kumi’s voice⟦1: (English; Tok Pisin on screen)¦2:⟧|Chosen by the adaptive learning engine (D2), so offline help still fits the child|Every word Kumi says offline has been reviewed by a person|[1] ⟦1:Live help¦2:Open conversation⟧ needs the internet: offline, Kumi says so kindly and carries on with the lesson",[("AI",1.0),("UX",0.5),("PL",0.5)]),
 ("D","D4",2,"Weekly quality review|Every Kumi conversation logged without names, with answers, time on task and drop-off points|A simple review screen where the content developer and the linguist rate a sample of about 50 conversations each week|Each problem traced to a prompt, a lesson or a question, and fixed|A weekly report flags lessons and questions that aren’t working|Ratings kept, so they can be used if Kumi’s AI is trained further after the pilot",[("AI",0.5)]),

 ("E","E1",0,"Class overview dashboard and report data|Learning metrics for the whole class|Progress tracker that flags students who need help|Anonymised data export (learning gains, usage and engagement) that feeds the pre- and post-pilot reports written in Phase 5",[("SE",1.0)]),
 ("E","E2",0,"Benchmark tests|Builds the tests set out in the Phase 1 assessment plan|One test per subject, taken before and after the pilot|Two matching versions, so children don’t answer the same questions twice|Taken inside the app and scored automatically|Reviewed by the Grade 3 teacher|Validates the pilot’s usability and learning outcomes",[("UX",1.0),("TC",0.5)]),

 ("3","G1",0,"Test planning and traceability|Test plan with a traceability matrix linking every requirement in the SRS to its test cases|Entry and exit criteria, and defect severity definitions agreed with the investor|Test computers set up to the school’s specification",{0:[("QA",0.5)],2:[("QA",1.0)]}),
 ("3","G2",0,"Functional and integration testing, on every build from week 10|Every feature tested against the SRS as it is built, not only at the end|End-to-end tests across the application, synchronisation, cloud backend⟦1:, narration, AI engine and adaptive engine¦2:, voice system and AI engine⟧|Automated regression suite written and run on every build",{0:[("QA",2.0)],2:[("QA",3.0)]}),
 ("3","G3",0,"Performance and resilience testing|Run on school-specification Windows computers with 8 GB of RAM⟦2:, with speech models and lessons running together⟧|Start-up time, lesson load time⟦2:, voice reply time⟧ and memory use measured against the KPI targets|Deliberate power cuts, dropped connections, long offline periods and several students syncing from one computer|[1] Online and offline switching tested under load|Load test: 40 children using Kumi at the same time⟦1:, within the AI and voice services’ request limits⟧",{0:[("QA",1.5)],2:[("QA",2.0)]}),
 ("3","G4",0,"⟦0:Language testing¦2:Voice and language testing⟧|[2] Kumi’s listening tested in the running app with child-size headsets and recorded classroom noise|Every screen⟦1: and offline help line¦2:, narration and offline help line⟧ checked in Tok Pisin inside the app by the linguist|[2] Fallbacks tested: ask again, tap-to-answer and the cloud speech fallback",{0:[("QA",0.5),("PL",0.5)],2:[("QA",1.0),("PL",0.5)]}),
 ("3","G5",0,"Security and privacy testing|Encryption at rest and in transit verified|Access controls checked: no student can reach another student’s data|Vulnerability scan of the application and the cloud backend|No personal identifiers in ⟦0:logs¦1:AI requests or logs⟧",[("QA",0.5),("SE",0.5)]),
 ("3","G6",1,"AI safety testing|Deliberately try to make Kumi say unsafe, off-topic or biased things, in English, Tok Pisin and mixed language, including slang, led by the linguist|Check that no personal data can leak through the AI|Fix and retest anything found",[("AI",1.0),("PL",1.0)]),
 ("3","G7",2,"Education specialist sign-off|An independent, experienced Grade 3 educator reviews the lessons and the benchmark tests before launch|Findings fixed before the pilot starts|Strengthens the evidence for DFAT and UNICEF",[("ED",1.5)]),
 ("3","G8",0,"Acceptance testing|The investor ⟦2:and the education specialist ⟧test the full app against the agreed acceptance criteria|Teachers try it on the school computers during installation (Phase 4)|Go-live readiness checklist signed off before installation",[("PM",0.5)]),
 ("3","G9",0,"Bug fixing|All critical and major issues fixed before installation|Minor issues logged and scheduled",[("SE",1.5)]),

 ("4","H1",0,"Pre-install site check|The linguist re-checks the lab a week before the trip: computers, power, internet and admin access|Any problem fixed or flagged before the installer flies",[("PL",0.5)]),
 ("4","H2",0,"On-site installation and teacher training in Port Moresby (one trip)|Install Kumi on every classroom computer, with lessons preloaded|Set up and test headsets⟦2: and microphones⟧|Check power, connectivity and the sync to the cloud|School briefing for leadership and teachers|Train teachers in person (one day)|Trial session with teachers and a small group of children on day 2|Supervise the first sessions and the opening benchmark test|Headsets bought in Australia and carried on the trip",[("SE",1.0)]),
 ("4","H3",0,"Fixes from the trial session|Problems found in the trial fixed in week 20, before the term starts|Released through automatic updates",[("SE",0.5),("QA",0.5)]),
 ("4","H4",0,"Teacher guide and follow-up|Teacher guide in English and Pijin, printed and as a PDF|Remote follow-up session in week 2 of the term|Clear support contacts and how to report a problem",[("PM",0.5)]),

 ("5","I1",0,"Pilot support|One point of contact for the school by phone, WhatsApp or email, about half a day a week, more in the first fortnight|We aim to respond within one business day|Crash reports let us spot most problems before the school notices them",{0:[("QA",1.5)],2:[("QA",2.0)]}),
 ("5","I2",0,"Local on-call support in Port Moresby|The linguist is the school’s local contact, guided remotely by the support team|A weekly half-day visit to check computers, headsets and sync|Call-outs for physical problems: a broken headset, a computer that won’t start, a loose cable",[("PL",1.5)]),
 ("5","I3",0,"Software fixes|Fixes released through automatic updates, with no visit needed",[("SE",0.5)]),
 ("5","I4",0,"⟦0:Content fixes¦2:Weekly quality review and content fixes⟧|[2] The weekly review (D4) run through the term by the content developer and the linguist|Lessons, questions⟦1:, offline help lines and Kumi’s prompts⟧ improved from ⟦0:teacher feedback and usage data¦2:what the review finds⟧",{0:[("UX",0.5),("PL",0.5)],2:[("UX",1.0),("PL",0.5),("AI",0.5)]}),
 ("5","I5",3,"Speech monitoring and retuning|Weekly accuracy check on consented recordings from the pilot class|One retraining round mid-term on real classroom speech, released through automatic updates|Speech accuracy figures for the post-pilot report",[("SP",1.0)]),
 ("5","I6",0,"School liaison and investor updates|Fortnightly check-ins with the teacher|Monthly progress update to the investor: usage, issues and early results",[("PM",1.0)]),
 ("5","I7",0,"Comparison class|A second Grade 3 class takes the same benchmark tests at the start and end of term, without using Kumi|Tests taken in the app on the lab computers, supervised by the linguist|Shows how much of the learning gain comes from Kumi",[("PM",0.5),("PL",0.5)]),
 ("5","I8",0,"Pre- and post-pilot reports|Pre-pilot baseline report from the opening benchmark test|Closing benchmark test at the end of term, inside the app|Post-pilot report: learning gains, usage⟦2:, speech accuracy⟧ and cost per student, compared with the baseline and with the comparison class|Findings and recommendations for scale-up: more schools, Grades 4–6",{0:[("PM",1.0)],1:[("PM",0.5),("AI",0.5)]}),

 ("P","P1",0,"Project management|Weekly status report: progress, risks, issues and budget|Milestone reports and sign-offs, M1 to M4|Change control for any change to scope, time or cost|Coordination with the pilot school",[("PM",4.0)]),
]

if os.environ.get('KEYWORDS'):   # platform-only view: the Core's one-way AI speech listens for a few common words, in English and Tok Pisin
    EP['B'] = (EP['B'][0], '⟦0:B. Tok Pisin glossary & keyword listening¦2:B. Kumi’s voice and English listening¦3:B. Kumi speech recognition & voice assistant system⟧', EP['B'][2])
    W.insert(next(k for k, w in enumerate(W) if w[1] == 'C1'),
     ("B","B10",0,"Keyword listening: common words|Kumi listens for about 20 common words and short phrases, in English and Tok Pisin: for example “help” (halivim), “again” (gen), “next” (nekis), “I don’t know” (mi no save) and “stop” (pinis)|The Tok Pisin list is built from the English–Tok Pisin dictionary, then the linguist records and checks every word|A small open-source keyword model that runs on the school computer, with no internet|When Kumi hears a keyword it starts the matching help for that step of the lesson|It listens for these words only; anything else the child says is ignored, and tapping Kumi always works",[("SP",1.0),("PL",0.5)]))

if os.environ.get('OWNAI'):   # quote-builder view: our own AI model as a priced task (the on-device add-on, made a choice)
    W.insert(next(k for k, w in enumerate(W) if w[1] == 'E1'),
     ("D","D5",0,"Our own AI model on a GPU server in the school|A small open-source language model (up to about 8 billion parameters, licensed for commercial use) on one GPU server in the school lab, so Kumi’s AI help works with no internet|The lab computers reach it over the lab network, so they stay as they are (8 GB is enough)|Tuned on Kumi’s lessons and persona, using about 30,000 training examples written with Claude and checked by the linguist|Training data cleaned, de-duplicated and split into training (80%), validation (10%) and test (10%) sets, so the model is judged on examples it has never seen|A 500-example test set checked by hand by the content developer|Compressed to 4-bit and served on one 16 GB graphics card, answering the whole class at once|If the server is down, Kumi falls back to its saved offline help|Safety-tested in English and Tok Pisin and compared with Claude before launch",[("AI",5.5),("UX",1.0),("PL",1.0),("QA",1.0)]))
    W.insert(next(k for k, w in enumerate(W) if w[1] == 'E1'),   # optional: improve our own model from what children did in the pilot
     ("D","D6",0,"Retrain our own AI model on pilot data|Anonymised records of how children used Kumi in the pilot: their questions, answers and where they got stuck, collected with consent under the data-protection plan (1.5)|About 10,000 records checked and labelled with Claude, then the best ones reviewed by the content developer|New examples added to the training set; the model retrained and checked on the same held-out test set, and released only if it does better|The updated model installed on the school’s GPU server",[("AI",1.5),("UX",0.5)]))

if os.environ.get('PLATFORM'):   # quote builder: Sing Singh AI builds the platform; the partner runs the school side of the pilot
    RESP['PL'] = RESP['PL'].replace(' The local on-call contact in Port Moresby during the pilot.', '')
    RESP['PM'] = 'Runs delivery, milestones and reporting to the investor. Owns safeguarding and data protection.'
    RESP['QA'] = 'Tests every release, online and offline.'
    _i = next(k for k, w in enumerate(W) if w[1] == 'P1')
    W[_i] = W[_i][:3] + (W[_i][3].replace('|Coordination with the pilot school', ''), [("PM", 3.0)])
    # the Tok Pisin linguist is kept only for the Tok Pisin speech model (recordings need a native speaker); Tok Pisin text comes from the dictionary
    RESP['PL'] = "⟦2:Runs the voice actor sessions and checks Kumi’s Tok Pisin voice.¦3:Writes the speech scripts, runs the recording sessions and checks Kumi’s Tok Pisin speech models.⟧"
    def _edit(code, alloc=None, text=None, drop=None):
        k = next((i for i, w in enumerate(W) if w[1] == code), None)
        if k is None: return   # D5 only exists with OWNAI
        ph, c, t0, task, al = W[k]
        if drop: al = [(r, x) for r, x in al if r != drop] if isinstance(al, list) else {t: [(r, x) for r, x in v if r != drop] for t, v in al.items()}
        if text: task = task.replace(*text) if task.count(text[0]) == 1 else (_ for _ in ()).throw(ValueError(code))
        W[k] = (ph, c, t0, task, alloc if alloc is not None else al)
    for _c in ('C1', 'D3', 'G4', 'G6', 'B10', 'D5'): _edit(_c, drop='PL')
    _edit('B2', alloc={0: [], 3: [("PL", 1.5)]})
    _edit('B10', text=('|The Tok Pisin list is built from the English–Tok Pisin dictionary, then the linguist records and checks every word', '|The Tok Pisin list is built from Sing Singh AI’s English–Tok Pisin dictionary'))
    _edit('D3', text=('checked by the content developer (English) and the linguist (Tok Pisin), and voiced', 'checked by the content developer, with Tok Pisin from the dictionary, and voiced'))
    _edit('G4', text=('checked in Tok Pisin inside the app by the linguist', 'checked inside the app against the Tok Pisin dictionary'))
    _edit('G6', text=(', including slang, led by the linguist', ', including slang'))
    _edit('D5', text=(' and checked by the linguist', ''))
    _edit('1.5', text=('|Criminal record and reference checks for anyone who will work with children', '|Criminal record and reference checks for anyone who will work with children (the school partner’s staff)'))
    _edit('C1', text=('|Drafted with AI help, then written up by the content developer: about 1.5 days per lesson',
                       '|Drafted with AI help, then built by the content developer: about 1 day per lesson, reusing the character and animation library (C5)|Translated into Tok Pisin by AI, using Sing Singh AI’s English–Tok Pisin dictionary|[1-1] English narration generated automatically with ElevenLabs, in Kumi’s voice|[2] Narration generated automatically with Kumi’s voice models (stream B)'))
    del W[next(i for i, w in enumerate(W) if w[1] == 'C4')]   # translation and narration are done by AI, inside C1
    # testing and safeguarding: the pilot-only parts go (the classroom load test, installation checks, the school's consent and incident process)
    EP['3'] = (EP['3'][0], 'Testing & release readiness', EP['3'][2])
    DFAT['QA'] = ('QA / Test Engineer',) + DFAT['QA'][1:]   # no pilot support in the platform view
    _edit('G1', text=('|Test computers set up to the school’s specification', '|Test laptop matching the school’s computer specification'))
    _edit('G3', alloc={0: [("QA", 1.0)], 2: [("QA", 1.5)]}, text=('|Load test: 40 children using Kumi at the same time⟦1:, within the AI and voice services’ request limits⟧', ''))
    _edit('G8', alloc=[("PM", 0.25)], text=('|Teachers try it on the school computers during installation (Phase 4)|Go-live readiness checklist signed off before installation', '|Release signed off by the investor'))
    _edit('1.5', alloc=[("PM", 0.25)], text=('|Criminal record and reference checks for anyone who will work with children (the school partner’s staff)', ''))
    _edit('1.5', text=('|Parent and guardian consent process for the pilot⟦2:, including voice interaction⟧, and for the comparison class’s tests', ''))
    _edit('1.5', text=('|Incident-reporting procedure in line with DFAT’s Child Protection Policy and PNG’s Lukautim Pikinini Act 2015', '|Consent forms, personnel checks and the school’s incident procedure are run by the school partner, in line with DFAT’s Child Protection Policy and PNG’s Lukautim Pikinini Act 2015'))
    # lessons: content is either provided to us (the designer turns it into animated lessons) or prepared by us (an extra, priced on its own).
    # Half a day of design per lesson for each part; no teacher support from PNG, which the school partner supplies if wanted.
    k = next(i for i, w in enumerate(W) if w[1] == 'C1')
    W[k] = ("C","C1",0,"Animated lessons|⟦0:20 one-hour lessons¦3:30 one-hour lessons⟧, built by the designer from the lesson content|Each hour follows one lesson template: ⟦0:an illustrated¦1:a narrated, illustrated⟧ explanation with worked examples, then guided activities and practice⟦1: that Kumi adapts to the child⟧|About half a day of design per lesson, reusing the character and animation library (C5)|Tok Pisin text translated by AI, using Sing Singh AI’s English–Tok Pisin dictionary|[1-1] English narration generated automatically with ElevenLabs, in Kumi’s voice|[2] Narration generated automatically with Kumi’s voice models (stream B)|Inclusive by design: language, examples and pictures suited to 8-year-olds in PNG; balanced representation of girls and boys and of different regions; accessible to children from marginalised groups and children with disabilities",
              {0: [("UX", 2.0), ("PM", 0.5)], 3: [("UX", 3.0), ("PM", 0.5)]})
    _edit('C3', alloc={0: [("UX", 1.0)], 3: [("UX", 1.5)]}, text=('|PNG-themed scenes, names, places and everyday objects that children recognise', '|PNG-themed scenes, names, places and everyday objects that children recognise, from the library'))
    W.insert(next(i for i, w in enumerate(W) if w[1] == 'C3') + 1,
     ("C","C5",0,"Character and animation library|Kumi, the other characters, the PNG scenes and the motion templates designed once and locked|Every lesson reuses the library, so a lesson takes about half a day to animate|Each lesson’s animations are put together from the library, not drawn from scratch",[("UX",1.0)]))
    W.insert(next(i for i, w in enumerate(W) if w[1] == 'C5') + 1,
     ("C","C6",0,"Prepare the lesson content (when it is not provided to us)|Lessons drafted from the PNG Grade 3 syllabus with AI help, then written up by the content developer: about half a day per lesson|⟦0:20 lessons mapped to learning outcomes¦3:30 lessons mapped to learning outcomes⟧ across the syllabus|Left out when the content is provided to us",
      {0: [("UX", 2.0)], 3: [("UX", 3.0)]}))
    _edit('E2', alloc=[("UX", 1.0)], text=('|Reviewed by the Grade 3 teacher', ''))   # no teacher support from PNG
    _edit('A2', text=('Student profile management|', 'Individual student login and profiles|'))
    RESP['UX'] = 'Designs the app and Kumi’s PNG-themed look. Turns the lesson content into animated lessons and builds the benchmark tests. When we prepare the content ourselves, also writes the lessons and the question bank.'

ADDONS = [  # name, what it adds, [(role, weeks)], third-party AUD, third-party note
 ("On-device AI model for schools without internet",
  "A small open-source language model (1–4 billion parameters, licensed for commercial use) on each computer, so Kumi can hold an open conversation with no internet. Compressed to 4-bit, tuned on Kumi’s lessons and persona, safety-tested in both languages and benchmarked against the cloud engine. Only needed for schools with no reliable connection; may need 16 GB machines alongside the speech models.",
  [("AI",4.5),("PL",1.0),("QA",1.0)], 40*5, "includes ~40 GPU-hours"),
 ("Mac build",
  ".dmg installer, notarised by Apple. Only needed if the school uses Macs.",
  [("SE",0.5)], round(99*FX), "includes Apple Developer Program fee"),
]

def money(x, dp=0): return "$" + f"{x:,.{dp}f}"
def wk(x): return '%g' % x
E = html.escape

# --- tier markup ---
VAR = re.compile(r'⟦(.*?)⟧', re.S)
PFX = re.compile(r'^\[(\d)(?:-(\d))?\]\s*')
def pick(group, at=None):
    at = TIER if at is None else at
    best = None
    for opt in group.split('¦'):
        k, _, t = opt.partition(':'); k = int(k)
        if k <= at and (best is None or k >= best[0]): best = (k, t)
    return best
def tx(s, base=0, esc=True, hl=True, at=None):
    """Resolve ⟦…⟧ variants for this tier; highlight a variant added above `base`."""
    out, pos = [], 0
    for m in VAR.finditer(s):
        lit = s[pos:m.start()]; out.append(E(lit) if esc else lit)
        b = pick(m.group(1), at)
        if b:
            t = E(b[1]) if esc else b[1]
            out.append(f"<span class='h{b[0]}'>{t}</span>" if hl and b[0] >= 1 and b[0] > base and t.strip() else t)
        pos = m.end()
    lit = s[pos:]; out.append(E(lit) if esc else lit)
    return ''.join(out)
def plain(s): return tx(s, esc=False, hl=False)
def parse(s):
    """Bullet prefix [a] or [a-b] -> (shown in this tier?, tier it was added in, text)."""
    m = PFX.match(s)
    if not m: return True, 0, s
    a = int(m.group(1)); b = int(m.group(2)) if m.group(2) else 9
    return a <= TIER <= b, a, s[m.end():]
def lis(items, base=0, esc=True, hl=True):
    out = []
    for it in items:
        ok, t, s = parse(it)
        if not ok: continue
        body = tx(s, max(t, base), esc, hl)
        if not re.sub(r'<[^>]+>', '', body).strip(): continue
        cls = f" class='h{t}'" if hl and t >= 1 and t > base else ""
        out.append(f"<li{cls}>{body}</li>")
    return ''.join(out)
def chip(t): return f"<span class='chip c{t}'>T{t}</span>" if t >= 1 else ""

def resolve(alloc):
    if isinstance(alloc, list): return 0, alloc
    k = max(k for k in alloc if k <= TIER); return k, alloc[k]

# labour
rows_by_ep = {}; lab_total = 0; lab_weeks = 0; role_tot = {}
for ph, code, t0, task, alloc in W:
    if TIER < t0:
        rows_by_ep.setdefault(ph, []).append((code, t0, task, None, 0)); continue
    k, al = resolve(alloc); lines = []
    for r, w in al:
        cost = w*5*RATE[r]; lines.append((r, w, cost))
        if code in CUT: continue
        lab_total += cost; lab_weeks += w
        role_tot.setdefault(r, [0,0]); role_tot[r][0] += w; role_tot[r][1] += cost
    rows_by_ep.setdefault(ph, []).append((code, t0, task, lines, k))
ROLES = [r for r in ROLE_ORDER if r in role_tot]

TP = [  # item, AUD, basis, source, first tier
 ("Windows code-signing certificate (OV, 1 yr) — stops “unknown publisher” warnings on school PCs", 220*FX, "Sectigo OV via reseller ≈ US$215–220/yr", "sslinsights", 0),
 ("ElevenLabs plan, 1 month of lesson narration production", (99 if TIER < 2 else 330)*FX, "US$99/mo Pro plan, 500k credits (English only)" if TIER < 2 else "US$330/mo Scale plan, ~2M credits", "elevenlabs", 1),
 ("Kumi’s voice actor: about 12 hours of recording sessions, plus usage rights", 12*80+1500, "A$80/hour + A$1,500 usage rights", None, 2),
 ("Tok Pisin speakers: 20 scripted recording sessions of 2.5 hours", 20*2.5*30, "A$30/hour", None, 3),
 ("Portable recording kit: 2 studio USB microphones, headphones, portable vocal booth", 900, "One-off", None, 2),
 ("Claude API usage during development and testing", 400, "Allowance", None, 1),
 ("Cloud hosting during build (staging + production), 5 months", 5*150, "A$150/mo, same as the running-cost line", None, 0),
 ("1 entry-level Windows laptop matching school spec, for testing (provisional sum)", 800, "Provisional sum", None, 0),
 ("Criminal record checks for team members in contact with children (provisional sum)", 400, "Required by DFAT’s Child Protection Policy", "dfat_cpp", 0),
 ("IARPA Babel Tok Pisin speech corpus, about 200 hours (provisional sum)", 500, "LDC licence; commercial-use terms to be confirmed", "ldc", 3),
 ("GPU rental for speech recognition training: about 200 GPU-hours", 200*5, "~A$5/hr: H100 on-demand ≈ US$2.59–3.29/hr", "gpu", 3),
 ("GPU rental for Kumi’s voice training: about 150 GPU-hours", 150*5, "~A$5/hr: H100 on-demand ≈ US$2.59–3.29/hr", "gpu", 2),
 ("Headsets with microphones (Logitech H390 USB): one per child for up to 40 children, plus 4 spares", 44*89, "44 × A$89 (Officeworks). A$38–A$120 across Australian retailers", "headset", 0),
 ("Local transport for school visits in Port Moresby (provisional sum)", 15*40, "About 15 visits × A$40", None, 0),
 ("Teacher allowance for extra time during the pilot (provisional sum, agreed with the school)", 2*10*50, "2 teachers × 10 weeks × A$50", None, 0),
]
if os.environ.get('PLATFORM'):   # quote builder: the Claude allowance worked out from the build and test workload
    _conv = lambda i, o, pi, po: (i*pi + o*po)/1e6   # US$ per call, prices per million tokens
    _kumi = _conv(9000, 1200, 1, 5); _grade = _conv(8000, 500, 2, 10)*0.5   # a 6-exchange test lesson on Haiku 4.5; graded by Sonnet 5.5 in a batch (half price)
    _claude = (18000*_conv(6000, 800, 1, 5) + 18000*(_kumi + _grade) + 15000*(_kumi + _grade) + 3900*_kumi*0.6 + 1800*_conv(4000, 800, 2, 10))*1.5*FX
    _i = next(i for i, t in enumerate(TP) if t[0].startswith("Claude API"))
    TP[_i] = (TP[_i][0], _claude, "Prompt tuning (about 18,000 calls); about 18,000 automated test lessons and 15,000 safety tests, graded by Claude Sonnet 5.5 in batches; load tests; drafting the offline help bank. Plus 50% for re-runs after fixes. Claude Haiku 4.5 US$1/US$5, Sonnet 5.5 US$2/US$10 per million tokens", "claude", 1)
TP_CUT_KEYS = {"Headsets": "headsets", "Local transport": "transport", "Teacher allowance": "allowance", "Criminal record": "criminal"}
def tp_cut(name): return any(k in name and v in CUT for k, v in TP_CUT_KEYS.items())
TP_IN = [x for x in TP if x[4] <= TIER and not tp_cut(x[0])]
tp_total = sum(x[1] for x in TP_IN)

FLIGHT, NIGHT, MI, SEC = 900, 260, 100, 150
TRIP = ("Installation and teacher training (weeks 19–20)", "Software Engineer", 1, 7)
t_f = TRIP[2]*FLIGHT; t_h = TRIP[2]*TRIP[3]*NIGHT; t_m = TRIP[2]*TRIP[3]*MI; t_s = TRIP[2]*TRIP[3]*SEC; t_tot = t_f+t_h+t_m+t_s
ins = 100
travel_shown = t_tot + ins
travel_total = 0.0 if 'travel' in CUT else travel_shown

SESS = 13  # 3 one-hour lessons a week ≈ 13 sessions/student/month
AI_PER = (5*(1500*0.10 + 500*1.00 + 150*5.00) + (3000*1.00 + 300*5.00))/1e6
AI_STU = AI_PER*SESS*FX if TIER >= 1 else 0.0   # live AI from tier 1
HOST = 150
LIC = (220*FX)/12
SUPPORT = 2*RATE["SE"]
def voice(n):
    if TIER < 1: return 0.0, "None"   # core: no live voice
    credits = n*5*150*SESS*0.5
    if credits <= 500_000: return 99*FX, "Pro (500k credits)"
    if credits <= 2_000_000: return 330*FX, "Scale (2M credits)"
    return 1320*FX, "Business"
ASR_STU = 0.0  # speech runs on the school computer
def run(n):
    v, tier = voice(n)
    infra = HOST + AI_STU*n + ASR_STU*n + v + LIC
    return dict(n=n, host=HOST, ai=AI_STU*n, asr=ASR_STU*n, voice=v, tier=tier, lic=LIC, infra=infra, support=SUPPORT, total=infra+SUPPORT)
pilot_month = run(100)["infra"]; pilot_running = pilot_month*3
bridge_month = run(100)["total" if TIER >= 2 else "infra"]; bridge = bridge_month*3 if TIER >= 1 else 0.0  # keeps Kumi live while the next funding is raised (from tier 1)
pilot_shown, bridge_shown = pilot_running, bridge
if 'pilot_run' in CUT: pilot_running = 0.0
if 'bridge' in CUT: bridge = 0.0

direct = lab_total + tp_total + travel_total + pilot_running + bridge
mgmt = MGMT*lab_total; cont = CONT*direct; grand = direct + mgmt + cont

def addon_cost(alloc, tp):
    lab = sum(w*5*RATE[r] for r, w in alloc)
    return lab + tp + MGMT*lab + CONT*(lab+tp), sum(w for _, w in alloc)
addon_rows = [(n, d, alloc, tp, note) + addon_cost(alloc, tp) for n, d, alloc, tp, note in ADDONS]

def _per_lesson():  # what 10 more lessons add to stream C (3rd subject), per lesson: writing, pictures, questions, translation, teacher review
    tot = 0
    for ph, code, t0, task, alloc in W:
        if ph == "C" and isinstance(alloc, dict):
            a0, a3 = dict(alloc[0]), dict(alloc[3])
            tot += sum((a3.get(r, 0) - a0.get(r, 0))*5*RATE[r] for r in set(a0) | set(a3))
    return tot/10
extra_lesson = _per_lesson()
extra_lesson_all = extra_lesson*(1+MGMT+CONT)

# Payment schedule. Each payment is made before its block of work starts.
# The contingency is not in the payments: it is held back and paid only for changes approved in writing.
def ep_lab(ph): return sum(l[2] for c_,_,_,ls,_ in rows_by_ep[ph] if ls and c_ not in CUT for l in ls)
RUNS = {"A":(4,12),"B":(4,17),"C":(4,17),"D":(6,17),"E":(12,15),"3":(9,18),"P":(1,20)}  # weeks each stream runs
def lab_in(ph, a, b):  # share of a stream's labour that falls in weeks a–b, spread evenly over its weeks
    s0, e0 = RUNS[ph]
    return ep_lab(ph) * max(0, min(b, e0) - max(a, s0) + 1) / (e0 - s0 + 1)
TP_PAY = {"code-signing":2,"ElevenLabs":3,"voice actor":2,"Tok Pisin speakers":2,"recording kit":2,"Claude API":3,
          "Cloud hosting":2,"laptop":2,"Criminal record":1,"IARPA":2,"GPU rental":3,"headsets":4,"Local transport":5,"Teacher allowance":5}
def tp_for(n):
    tot = 0
    for item, c, _, _, _ in TP_IN:
        hits = [k for k in TP_PAY if k.lower() in item.lower()]; assert len(hits) == 1, item
        tot += c if TP_PAY[hits[0]] == n else 0
    return tot
BUILD = ["A","B","C","D","E","3"]
PAY_LAB = {1: ep_lab("1") + lab_in("P",1,3),
           2: sum(lab_in(x,4,10) for x in BUILD) + lab_in("P",4,10),
           3: sum(lab_in(x,11,18) for x in BUILD) + lab_in("P",11,18),
           4: ep_lab("4") + lab_in("P",19,20),
           5: ep_lab("5")}
PAY_OTHER = {1: tp_for(1), 2: tp_for(2), 3: tp_for(3), 4: tp_for(4) + travel_total, 5: tp_for(5) + pilot_running + bridge}
PAYMENTS = [  # number, when, released once, what it pays for
 (1, "Week 0", "The contract is signed", "Phase 1 · Project setup & requirements (weeks 1–3)"),
 (2, "Week 3", "M1 Requirements signed off", "Phases 2–3 · Build and testing, part 1 (weeks 4–10)"),
 (3, "Week 10", "M2 Working build shown", "Phases 2–3 · Build and testing, part 2 (weeks 11–18)"),
 (4, "Week 18", "M3 Pilot-ready signed off", "Phase 4 · Installation & teacher training (weeks 19–20)"),
 (5, "Week 20", "M4 Live in school", "Phase 5 · Pilot term & reports (weeks 21–31)" + (", plus a 3-month bridge" if TIER >= 1 else "")),
]
PAY_AMT = {n: PAY_LAB[n]*(1+MGMT) + PAY_OTHER[n] for n, *_ in PAYMENTS}
assert abs(sum(PAY_AMT.values()) + cont - grand) < 0.01, (sum(PAY_AMT.values()) + cont, grand)
# whole dollars that add up to the printed total; the last payment absorbs the rounding
PAY_SHOW = {n: round(v) for n, v in PAY_AMT.items()}
PAY_SHOW[5] += round(grand) - round(cont) - sum(PAY_SHOW.values())
def shares(vals):  # whole percentages that add up to 100 (largest remainder)
    raw = [v / sum(vals) * 100 for v in vals]; out = [int(r) for r in raw]
    for i in sorted(range(len(raw)), key=lambda i: raw[i] - out[i], reverse=True)[:100 - sum(out)]: out[i] += 1
    return out
PAY_PCT = shares([PAY_SHOW[n] for n, *_ in PAYMENTS] + [round(cont)])

SRC = {
 "dfat_arf":("DFAT Aid Adviser Remuneration Framework (v7.2, July 2023)","https://www.dfat.gov.au/sites/default/files/aid-adviser-remuneration-framework-july-2023.pdf"),
 "dfat_rates":("DFAT short-term adviser daily rate tables, 1 July 2025 – 30 June 2026","https://www.dfat.gov.au/sites/default/files/revised-short-term-adviser-rates-july-2021-onwards.docx"),
 "cloudcolleague":("CloudColleague — 2026 guide to Australian contractor day rates (direct-hire)","https://cloudcolleague.com/blogs/hiring-strategies/hire-it-contractor-australia/"),
 "hays":("Hays — FY25/26 IT Contractor Rates Guide (authoritative check)","https://www.hays.com.au/press-release/content/fy25-26-it-contractor-rates-guide"),
 "claude":("Claude Haiku 4.5 pricing, US$1 / US$5 per million tokens","https://pricepertoken.com/pricing-page/model/anthropic-claude-haiku-4.5"),
 "elevenlabs":("ElevenLabs plans and credits, 2026","https://smallest.ai/blog/elevenlabs-pricing-plans-cost-what-you-get-in-2026"),
 "sslinsights":("Sectigo vs DigiCert code-signing prices, 2026","https://sslinsights.com/digicert-vs-sectigo-code-signing/"),
 "devclass":("Azure Artifact Signing — not yet available to Australian organisations","https://devclass.com/2026/01/14/code-signing-windows-apps-may-be-easier-and-more-secure-with-new-azure-artifact-service/"),
 "gpu":("NVIDIA H100 cloud rental prices compared, 2026","https://intuitionlabs.ai/articles/h100-rental-prices-cloud-comparison"),
 "headset":("Logitech H390 USB headset, Officeworks","https://www.officeworks.com.au/shop/officeworks/p/logitech-h390-usb-computer-headset-black-inlogh390"),
 "headset2":("Logitech H390 prices across Australian retailers (PriceMe)","https://www.priceme.com.au/Logitech-H390/p-885467752.aspx"),
 "bedrock":("Amazon Bedrock: Claude Haiku 4.5 processed within Australia (AWS, Oct 2025)","https://aws.amazon.com/blogs/machine-learning/introducing-amazon-bedrock-cross-region-inference-for-claude-sonnet-4-5-and-haiku-4-5-in-japan-and-australia/"),
 "terms":("Sample 2027 PNG school term dates (IEA, Port Moresby)","https://www.iea.ac.pg/calendar/term-dates"),
 "dfat_cpp":("DFAT Child Protection Policy — minimum standards for funded partners","https://www.dfat.gov.au/sites/default/files/child-protection-policy.pdf"),
 "apple":("Apple Developer Program cost, 2026","https://studio.adalo.com/blog/apple-developer-program-guide"),
 "flights":("Brisbane–Port Moresby return fares, Air Niugini and Qantas (Skyscanner)","https://www.skyscanner.com.au/routes/bne/pom/brisbane-to-port-moresby.html"),
 "hotels":("Port Moresby hotel rates (Hilton and others, Momondo)","https://www.momondo.com.au/hotels/port-moresby"),
 "smartraveller":("Smartraveller — Papua New Guinea travel advice","https://www.smartraveller.gov.au/destinations/papua-new-guinea"),
 "lpa":("Lukautim Pikinini Act 2015 (PNG child protection law, PacLII)","https://paclii.org/pg/legis/num_act/lpa2015204"),
 "ldc":("IARPA Babel Tok Pisin Language Pack (LDC2018S02)","https://catalog.ldc.upenn.edu/LDC2018S02"),
 "png_data":("PNG data protection status (DataGuidance)","https://www.DataGuidance.com/jurisdiction/papua-new-guinea"),
}
PRE = {  # stage intros, as bullet sections; a [n] before a section title shows it from tier n
 "B": [("How Kumi listens and speaks", [
        "[0-0] The core has no voice: lessons are read on screen and children answer by tap. Only the Tok Pisin glossary below is needed.",
        "[1-1] Kumi speaks English, with a voice made in ElevenLabs: it narrates lessons and hints, and voices its live help replies. Tok Pisin is shown on screen.",
        "[1-1] Children answer and ask for help by tap. The Tok Pisin glossary below is the only task in this stream at this tier.",
        "[2] The voice loop works in English first.",
        "[2-2] Kumi speaks with its own Tok Pisin voice, built from a voice actor’s recordings, and an English voice from ElevenLabs.",
        "[2-2] Children can answer by voice in English, using an off-the-shelf speech model. Tok Pisin answers are by tap.",
        "[3] Tok Pisin speech is built from our own recordings. No major provider supports Tok Pisin speech, and Meta’s research model can’t be used commercially.",
        "[3] The AI already translates text between English and Tok Pisin. What’s missing is speech, and that is built here.",
        "[3] Young children’s voices are the hardest part. The model is tuned for children’s pitch and pace, and retuned during the pilot."]),
       ("[3]Scope for the pilot", [
        "[3] Kumi reliably understands answers, numbers, words and short requests, in Tok Pisin, English or a mix.",
        "[3] Open conversation in Tok Pisin is measured and improved through the term. It is not guaranteed.",
        "[2] Tap-to-answer is always there."])],
 "D": [("⟦0:Kumi’s help and AI¦1:One AI engine, sized for one class⟧", [
        "[0-0] Nothing in this stream is in the core. Adaptive practice and Kumi’s help are added in Tier 1.",
        "[1] Online: Kumi’s ⟦1:live help¦2:conversation⟧ runs on Claude in the cloud.",
        "[1-1] Children tap for help, and Kumi explains in its own words: spoken in English, or on screen in Tok Pisin.",
        "[1] Offline: Kumi teaches from a bank of approved hints, explanations and encouragement.⟦2: It still listens and speaks.⟧",
        "[1] The same adaptive learning engine picks what comes next, online or offline.",
        "[1] The pilot school has internet. Offline mode covers outages.",
        "An on-device AI model for schools with no internet is an optional add-on."])],
}

def pay(n): return f"payment {n} ({money(PAY_SHOW[n])})"

STAGE_OUT = {  # after each stage: payment note, deliverables, KPIs
 "1": dict(ms=f"Sign-off at M1 · Week 3 unlocks {pay(2)}",
   deliver=["Project plan and governance","Software Requirements Specification (SRS)","System architecture document",
            "UX/UI designs and clickable prototype","Content and assessment plan",
            "Safeguarding and data protection plan, with signed codes of conduct and personnel checks",
            "School agreement with the pilot school","Site survey of the school’s computers, internet and power",
            "Department of Education approval application"],
   kpis=["Every feature in scope written up with clear acceptance criteria.",
         "The architecture shows how each target is met: offline use, 8 GB computers, privacy.",
         "The clickable prototype covers every child and teacher screen.",
         "Every lab computer checked against the spec.",
         "All Phase 1 documents delivered by week 3."]),
 "A": dict(ms=f"Working build at M2 · Week 10 unlocks {pay(3)}",
   deliver=["Windows app framework and lesson engine, built on the existing Kumi prototype","Student profiles, with picture-and-PIN sign-in and language choice",
            "Online and offline modes, with sync","Lesson sync from the cloud","Cloud backend and central database (AWS Sydney)",
            "Security, backups and crash monitoring","Code-signed Windows installer","Technical documentation and an installation guide"],
   kpis=["The app opens in under 15 seconds on an 8 GB school computer.",
         "A cached lesson loads in under 3 seconds.",
         "99% of sessions finish without a crash.",
         "Every lesson works with no internet.",
         "No data lost in power-cut and dropped-connection tests.",
         "100% of offline records synced, with no duplicates, once the connection returns."]),
 "B": dict(ms="⟦0:Accepted at M3 · Week 18¦2:Reported at M3 · Week 18⟧",
   deliver=["[3] Tok Pisin speech dataset: about 30 hours of adult speech, with consent from every speaker","⟦0:Tok Pisin glossary and style guide¦2:Pronunciation lexicon and Tok Pisin glossary⟧",
            "[3] Speech recognition model, with an accuracy report","[2-2] English speech model, with an accuracy report",
            "[2] Kumi’s voice in Tok Pisin and English, with written usage rights",
            "[2] ⟦2:Speech models¦3:Both speech models⟧ running on the school computers","[2] Voice companion working in the app",
            "[2] All recordings and models owned by the project, ready to reuse at scale-up"],
   kpis=["[0-1] The glossary is agreed and used for every translation.",
         "[3] At least 90% of activity answers recognised correctly, on voices the model has never heard.",
         "[2-2] At least 90% of English activity answers recognised correctly, on voices the model has never heard.",
         "[2] Kumi starts replying within about 2 seconds on an 8 GB computer.",
         "[2] Listening and speaking work fully offline, at $0 per minute.",
         "[2] Native Tok Pisin speakers rate Kumi’s voice clear and natural in listening tests.",
         "[2] Tap-to-answer works on every spoken activity."]),
 "C": dict(ms="Accepted at M3 · Week 18",
   deliver=["⟦0:20¦3:30⟧ one-hour lessons in English and Tok Pisin⟦1:, with English narration¦2:, with narration⟧","Practice question bank","Illustrations and animations"],
   kpis=["⟦0:20¦3:30⟧ lessons, 10 per subject, loaded and working.",
         "About ⟦0:800¦3:1,200⟧ practice questions, every one linked to a skill.",
         "100% of lessons reviewed by the PNG Grade 3 teacher against the syllabus.",
         "100% of Tok Pisin translations⟦2: and narration⟧ checked by the linguist.",
         "No lesson with broken ⟦1:audio, ⟧pictures or questions at launch."]),
 "D": dict(ms="⟦0:Accepted at M3 · Week 18¦1:Shown at M2 · Week 10 · accepted at M3 · Week 18⟧",
   deliver=["[1] Cloud AI engine (Claude, processed in Australia), with its child-safety layer","[1] Conversation test set in both languages","[1] Adaptive learning engine",
            "[1] Offline help bank, reviewed and voiced","[2] Weekly quality review screen and report"],
   kpis=["[1] Online, Kumi starts replying within 3 seconds on a normal connection.",
         "[1] All of the ~300 test conversations pass, re-run after every change.",
         "[1] No unsafe reply left unfixed after AI safety testing.",
         "[1] No children’s names or personal details sent to the AI.",
         "[1] Offline help available for every lesson section.",
         "[1] The adaptive engine passes every simulated-learner test."]),
 "E": dict(ms="Shown at M3 · Week 18",
   deliver=["Class overview dashboard","Anonymised report data for the pre- and post-pilot reports","Benchmark tests, one per subject, in two matching versions"],
   kpis=["The dashboard updates within 5 minutes of a lesson, when online.",
         "Every student who needs help is flagged.",
         "Tests are scored automatically, with 100% agreement with the answer key.",
         "⟦0:2¦3:3⟧ benchmark tests, one per subject, each in 2 matching versions."]),
 "3": dict(ms=f"Sign-off at M3 · Week 18 unlocks {pay(4)}",
   deliver=["Test plan and traceability matrix","Automated regression suite",
            "Test reports: functional, integration, performance, load, ⟦0:language¦2:voice and language⟧, security","[1] AI safety test report","[2] Education specialist sign-off","Signed go-live readiness checklist"],
   kpis=["100% of requirements covered by tests.",
         "0 open critical or major bugs at go-live.",
         "40 children use Kumi at once and every speed target still holds.",
         "99% of sessions crash-free in the final test round.",
         "[2] The education specialist signs off the lessons and tests."]),
 "4": dict(ms=f"Sign-off at M4 · Week 20 unlocks {pay(5)}",
   deliver=["Pre-install site check","Kumi installed on every classroom computer","Trial session with teachers and children, and its fixes","School briefed and teachers trained","Opening benchmark test done","Teacher guide in English and Tok Pisin"],
   kpis=["Kumi working on 100% of classroom computers.",
         "100% of headsets tested with the app.",
         "A full class session runs end to end with no blocking problem.",
         "Fixes from the trial released before the term starts.",
         "Teachers can run a session on their own after training."]),
 "5": dict(ms="Final milestone · M5 · Week 31",
   deliver=["Monthly progress updates to the investor","Local on-call support in Port Moresby","Pre-pilot baseline report","Closing benchmark test",
            "Comparison class test results","Post-pilot report, compared with the baseline and the comparison class",
            "[1] ⟦1:Kumi kept online at the school for 3 months after the pilot (hosting, AI and voice, without support)¦2:Kumi kept running at the school for 3 months after the pilot⟧"],
   kpis=["Kumi available for at least 98% of scheduled lesson time.",
         "99% of sessions finish without a crash.",
         "No learning data lost during the term.",
         "Critical bugs fixed within 2 business days.",
         "Support replies within 1 business day, and a local visit within 1 business day when needed.",
         "Pre- and post-pilot reports delivered by week 31 (M5)."]),
 "P": dict(ms="Weeks 1–20",
   deliver=["Weekly status reports","Milestone reports","Change log"],
   kpis=["A status report every week, on time.",
         "Every milestone delivered on or before its week.",
         "No change to scope, time or cost without written agreement."]),
}

def outputs(ph):
    d = STAGE_OUT[ph]
    if not lis(d['deliver']) and not lis(d['kpis']): return ""
    return (f"<div class='outputs'><div class='oh'><span>KPIs and deliverables for this stage</span><span class='ms'>{tx(d['ms'])}</span></div>"
            f"<div class='ocols'><div class='ocol'><h4>Deliverables</h4><ul>{lis(d['deliver'])}</ul></div><div class='ocol'><h4>KPIs</h4><ul>{lis(d['kpis'])}</ul></div></div></div>")

def pre(ph):
    out = []
    for title, items in PRE[ph]:
        ok, t, title = parse(title)
        body = lis(items)
        if ok and body: out.append(f"<b>{tx(title, t)}</b><ul>{body}</ul>")
    return "<div class='note pre'>" + "".join(out) + "</div>" if out else ""

N_TASKS = sum(1 for ph in rows_by_ep for row in rows_by_ep[ph] if row[3]); N_ROLES = len(ROLES)
R = [run(n) for n in (100,200,300)]
TIER_NAME = f"Tier {TIER}" if TIER else "Core build"
SHOW_LATER = TIER >= 1   # tiers show later-tier items faded; the core build leaves them out
WORDS = {5:"five",6:"six",7:"seven",8:"eight"}
n_core = len([r for r in ROLES if r not in ("TC","ED")])
team_extra = " and ".join(x for x, c in (("a local Grade 3 teacher", "TC" in ROLES), ("an external education specialist", "ED" in ROLES)) if c)

BLOCKS = [  # first tier, title, text (page 1)
 (1, "⟦1:Narrated companion¦2:Voice companion⟧", "⟦1:Kumi narrates every lesson in English, with Tok Pisin on screen. Children tap for help, and Kumi explains live.¦2:Kumi talks with each child. It motivates, encourages and answers questions.⟧"),
 (1, "Real-time content curation", "The next content changes with how each child is doing."),
 (0, "Multilingual support", "Tok Pisin and English. Each student selects their language.⟦1: Kumi speaks in English; Tok Pisin is shown on screen.¦2: Children can answer Kumi by voice in English.¦3: Children can answer Kumi by voice in Tok Pisin or English.⟧"),
 (0, "Teacher dashboard", "Class overview, learning metrics and a progress tracker. A learning profile for every student."),
 (0, "Benchmark tests and reports", "A test before and after the pilot, for the Kumi class and a comparison class without Kumi. A pre-pilot and a post-pilot report."),
 (0, "Windows app", "Runs on the school’s existing computers."),
 (0, "Offline fallback support", "The app won’t break if the internet disconnects. Internet is needed for the best experience."),
 (0, "Installation and support", "Installation, teacher training, and local on-call support in Port Moresby during the pilot.⟦1: Kumi stays online for 3 months after it.¦2: Kumi stays running, with support, for 3 months after it.⟧"),
]
def block(t, title, text):
    if TIER < t and not SHOW_LATER: return ""
    if TIER < t: return f"<div class='x'><b>{tx(title, hl=False, at=t)}</b><span>{tx(text, hl=False, at=t)}</span><span class='xnote'>Tier {t}+</span></div>"
    return f"<div class='b{t}'><b>{tx(title, t)}</b><span>{tx(text, t)}</span>{chip(t)}</div>"

o = [HEAD]; A = o.append
A(f"""<header>
  <div class="eyebrow">Investment budget · version 2 · <span class="tiername c{TIER}">{TIER_NAME}</span></div>
  <h1>Kingi — Grade 3 pilot in one school</h1>
  <div class="legend">Colours show what each tier adds: <span class="h1">Tier 1</span> <span class="h2">Tier 2</span> <span class="h3">Tier 3</span></div>
  <div class="lede" data-lede><p>This is the cost to build Kumi and run it with one Grade 3 class for one school term (10 weeks).</p>
<p>{tx("⟦0:Kumi records every lesson and answer.¦2:Kumi records every lesson, answer and conversation.⟧")} This data is used for:</p>
<ol>
<li>{tx("⟦0:<b>Progress tracking:</b> every child’s answers and progress are recorded.¦1:<b>Personal learning:</b> each child gets lessons at their own level.⟧", esc=False, hl=False)}</li>
<li><b>Better content:</b> Kumi finds what works and improves the rest.</li>
<li><b>Teacher support:</b> teachers see who is doing well and who needs help.</li>
<li><b>Evidence:</b> results for the PNG Government, DFAT, UNICEF and investors.</li>
</ol>
<p>{tx("⟦0:Kumi’s AI is used during the build; children’s data never goes to an AI service.¦1:Kumi uses cloud AI.⟧")} No hardware to buy.</p></div>
</header>
<div class="summary">
  <div class="kpi big"><div class="k">Total investment · AUD, excluding GST</div><div class="v">{money(grand)}</div><div class="s">Build, pilot term and reports. Paid stage by stage, before each stage starts. Includes a 15% contingency reserve.</div></div>
  <div class="kpi"><div class="k">Timeline</div><div class="v">31 weeks</div><div class="s"><b>20</b> weeks build + <b>10</b> weeks pilot + <b>1</b> week report</div></div>
  <div class="kpi"><div class="k">Team effort</div><div class="v">{math.ceil(lab_weeks)} person-weeks</div><div class="s">Total effort of a team of {N_ROLES}. 1 person-week = 1 person working full-time for 1 week. Most of the team is part-time.</div></div>
  <div class="kpi"><div class="k">Estimated run cost after pilot</div><div class="v">{money(R[2]['total']/300)}–{money(R[0]['total']/100)}</div><div class="s">Per student, per month, with support. {money(R[0]['total']/100,2)} at 100 students. {money(R[2]['total']/300,2)} at 300 students. Estimate at today’s prices. The pilot will confirm it.</div></div>
</div>
<div class="delivers"><b style="color:var(--navy)">What the investment delivers</b>
<div class="dhero"><div><b>{tx("⟦0:20¦3:30⟧")} hours</b><span>of content for each student</span></div><div><b>10 weeks</b><span>in class</span></div><div><b>{tx("⟦0:2¦3:3⟧")} hours</b><span>of learning each week</span></div><div><b>{tx("⟦0:2 subjects¦3:3 subjects⟧")}</b><span>{tx("⟦0:numeracy and literacy¦3:numeracy, literacy and personal development⟧")}</span></div></div>
<div class="dgrid">
{''.join(block(*b) for b in BLOCKS)}
</div></div>
<h2>Project team</h2>
<p class="h2sub">A core team of {WORDS[n_core]}{", plus " + team_extra if team_extra else ""}. Technical lead, curriculum lead and content development work is not dropped; it is shared across the team below.{" Speech and AI are split between two engineers: they are different specialisms, and both are on the critical path to the school." if "SP" in ROLES else ""}</p>
<div class="card"><table>
<tr><th>Team member</th><th>Role and responsibilities</th><th class="n">Engagement over the 31-week project</th></tr>""")
for r in ROLES:
    w, c = role_tot[r]
    A(f"<tr><td><b>{E(DFAT[r][0])}</b></td><td>{tx(RESP[r], hl=False)}</td><td class='n'>{wk(w)} weeks</td></tr>")
A(f"""<tr class="tot"><td colspan="2">Total team effort</td><td class="n">{wk(lab_weeks)} person-weeks</td></tr></table></div>
<h2>Work breakdown — every task, priced</h2>

""")
for ph in ["1","A","B","C","D","E","3","4","5","P"]:
    phase, title, when = EP[ph]; rows = rows_by_ep[ph]
    if not SHOW_LATER: rows = [r for r in rows if r[3]]
    if not rows: continue
    ep_c = sum(l[2] for c_, *_, ls, _ in rows if ls and c_ not in CUT for l in ls); ep_w = sum(l[1] for c_, *_, ls, _ in rows if ls and c_ not in CUT for l in ls)
    ep_all_c = sum(l[2] for *_, ls, _ in rows if ls for l in ls); ep_all_w = sum(l[1] for *_, ls, _ in rows if ls for l in ls)
    sc = ' cut' if (CUT and ep_all_c and not ep_c) else ''      # whole stage cut: show its original figures, struck
    show_c, show_w = (ep_all_c, ep_all_w) if sc else (ep_c, ep_w)
    A(f"""<div class="card"><div class="card-h"><div><div class="ph{sc}">{E(phase)} · {E(when)}</div><div class="t{sc}">{tx(title)}</div></div><div class="r"><div class="amt{sc}">{money(show_c)}</div><div class="wk{sc}">{wk(show_w)} person-weeks</div></div></div>
""" + (pre(ph) if ph in PRE else "") + """<table class="tasks"><tr><th></th><th>Task</th><th>Who</th><th class="n">Weeks</th><th class="n">Cost</th></tr>""")
    for code, t0, task, lines, k in rows:
        parts = task.split("|")
        if lines is None:   # added in a higher tier: shown faded, not priced (tiers only)
            A(f"<tr class='x'><td class='code'>{code}{'<br>' + chip(t0)}</td><td><b>{tx(parts[0], hl=False, at=t0)}</b><div class='xnote'>Added in Tier {t0}</div></td><td class='role'>—</td><td class='n wk'>—</td><td class='n co'>—</td></tr>")
            continue
        label = f"<b>{tx(parts[0], t0)}</b><ul class='sub'>{lis(parts[1:], t0)}</ul>" if len(parts) > 1 else tx(task, t0)
        who = " + ".join(E(DFAT[r][0]) for r,_,_ in lines)
        weeks = " + ".join(wk(w) for _,w,_ in lines) + " wk"
        cost = " + ".join(money(c) for _,_,c in lines) + (f"<br>= <b>{money(sum(c for _,_,c in lines))}</b>" if len(lines) > 1 else "")
        grew = f" h{k}" if k >= 1 and k > t0 else ""   # more weeks in this tier than in the first tier the task appears
        A(f"<tr class='r{t0}{' cut' if code in CUT else ''}'><td class='code'>{code}{('<br>' + chip(t0)) if t0 else ''}</td><td>{label}</td><td class='role'>{who}</td><td class='n wk{grew}'>{weeks}</td><td class='n co{grew}'>{cost}</td></tr>")
    A(f"<tr class='tot{sc}'><td></td><td colspan='2'>{plain(title)} total</td><td class='n wk'>{wk(show_w)} wk</td><td class='n co'>{money(show_c)}</td></tr></table>")
    if ph == "B" and TIER >= 2:
        VD = [(3,"Tok Pisin speakers, scripted reading","20 speakers × 2.5 hours = 50 hours of sessions → about 30 hours of clean speech","A$30/hour","$1,500"),
              (2,"Kumi’s voice actor","About 12 hours of sessions → 6 hours Tok Pisin + 1 hour English, plus usage rights","A$80/hour + A$1,500","$2,460"),
              (2,"Portable recording kit","2 studio USB microphones, headphones, portable vocal booth","one-off","$900"),
              (3,"Existing Tok Pisin speech corpus","IARPA Babel, about 200 hours, licensed through the LDC","provisional","$500"),
              (3,"GPU rental: speech recognition","About 200 GPU-hours over 15–20 training runs, NVIDIA H100","A$5/GPU-hour","$1,000"),
              (2,"GPU rental: Kumi’s Tok Pisin voice","About 150 GPU-hours, NVIDIA H100","A$5/GPU-hour","$750"),
              (2,"Speech at runtime","Runs on the school’s computers","—","$0/month")]
        A("<div class='note'><b>Voice data and compute plan.</b> Costs are carried in Licences, services and equipment.<table style='margin-top:8px'><tr><th>Resource</th><th>Quantity</th><th class='n'>Rate</th><th class='n'>Cost</th></tr>"
          + "".join(f"<tr class='r{t}'><td>{E(a)}{('<br>' + chip(t)) if t > 2 else ''}</td><td>{E(b)}</td><td class='n'>{E(c)}</td><td class='n'>{E(d)}</td></tr>" for t, a, b, c, d in VD if t <= TIER)
          + "</table></div>")
    A(outputs(ph))
    A("</div>")

def bar(s, e, cls=""):
    return f"<div class='g-bar {cls}' style='left:{(s-1)/31*100:.2f}%;width:{(e-s+1)/31*100:.2f}%'></div>"
A("""<h2>Timeline by week</h2><p class="h2sub">Content, Pijin and voice work run in parallel with the app build, so the build fits into 20 weeks of calendar time.</p>
<div class="gantt"><div class="g-scale"><div></div><div class="g-ticks"><span>Wk 1</span><span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>31</span></div></div>""")
for label, s, e, c in [("Project setup & requirements",1,3,""),("A. Application foundation",4,12,""),("⟦0:B. Tok Pisin glossary¦2:B. Kumi’s voice & listening¦3:B. Speech recognition & voice assistant⟧",4,17,"c"),("C. Curriculum content",4,17,"c"),("⟦0:D. Adaptive learning (Tier 1+)¦1:D. AI engine & adaptive learning⟧",6,17,""),("E. Class dashboard & benchmark tests",12,15,""),("Testing & pilot readiness",9,18,"t"),("Install & teacher training",19,20,"t"),("Pilot term — 10 weeks",21,30,"p"),("Evidence report",31,31,"p")]:
    if not SHOW_LATER and label.startswith("⟦0:D."): continue   # no stream D in the core build
    A(f"<div class='g-row'><div>{plain(label)}</div><div class='g-track'>{bar(s,e,c)}</div></div>")
A("</div>")

A("""<h2>Licences, services and equipment</h2><p class="h2sub">One-off costs during the build. USD prices converted at US$1 = A$1.55.</p>
<div class="card"><table><tr><th>Item</th><th>Basis</th><th class="n">Cost</th></tr>""")
for item, c, basis, s, t in TP:
    src = f" <span class='src'>[<a href='{SRC[s][1]}'>source</a>]</span>" if s in SRC else ""
    if t > TIER and not SHOW_LATER: continue
    if t > TIER:
        A(f"<tr class='x'><td>{E(item)}<br>{chip(t)}</td><td><span class='xnote'>Added in Tier {t}</span></td><td class='n'>—</td></tr>"); continue
    A(f"<tr class='r{t}{' cut' if tp_cut(item) else ''}'><td>{E(item)}{('<br>' + chip(t)) if t else ''}</td><td>{E(basis)}{src}</td><td class='n'>{money(c)}</td></tr>")
A(f"<tr class='tot'><td colspan='2'>Licences, services and equipment total</td><td class='n'>{money(tp_total)}</td></tr></table><div class='note'>Microsoft’s cheaper Azure Artifact Signing is not yet available to Australian organisations [<a href='{SRC['devclass'][1]}'>source</a>], so a standard certificate is budgeted.</div></div>")

A(f"""<h2{' class="cut"' if 'travel' in CUT else ''}>Travel to Port Moresby</h2><p class="h2sub{' cut' if 'travel' in CUT else ''}">One trip, to install Kumi and train the teachers. The local linguist handles school visits, and the benchmark tests run inside the app, so no other trips are needed. Flights A${FLIGHT:,} return, above recent Brisbane–Port Moresby fares of A$617–A$650 [<a href="{SRC['flights'][1]}">source</a>]. Hotel A${NIGHT}/night at a secure business hotel such as the Hilton or Stanley, about US$125–156 a night including tax [<a href="{SRC['hotels'][1]}">source</a>]. Meals A${MI}/day. Smartraveller advises a high degree of caution in PNG and flags vehicle hijacking in Port Moresby [<a href="{SRC['smartraveller'][1]}">source</a>], so a vetted driver is budgeted at A${SEC}/day as a provisional sum.</p>
<div class="card{' cut' if 'travel' in CUT else ''}"><table><tr><th>Trip</th><th class="n">People × nights</th><th class="n">Flights</th><th class="n">Secure hotel</th><th class="n">Meals</th><th class="n">Secure transport</th><th class="n">Total</th></tr>
<tr><td>{E(TRIP[0])}</td><td class='n'>{TRIP[2]} × {TRIP[3]}</td><td class='n'>{money(t_f)}</td><td class='n'>{money(t_h)}</td><td class='n'>{money(t_m)}</td><td class='n'>{money(t_s)}</td><td class='n'>{money(t_tot)}</td></tr>
<tr><td colspan='6'>Travel insurance and entry costs</td><td class='n'>{money(ins)}</td></tr><tr class='tot'><td colspan='6'>Travel total</td><td class='n'>{money(travel_shown)}</td></tr></table></div>
<h2>Cost summary</h2>
<div class="total-box"><table>
<tr><td>Project team — {wk(lab_weeks)} person-weeks</td><td class="n">{money(lab_total)}</td></tr>
<tr><td>Licences, services and equipment</td><td class="n">{money(tp_total)}</td></tr>
<tr{' class="cut"' if 'travel' in CUT else ''}><td>Travel to Port Moresby (1 trip)</td><td class="n">{money(travel_shown)}</td></tr>
<tr{' class="cut"' if 'pilot_run' in CUT else ''}><td>Running costs during the 10-week pilot<span class="why">{tx("⟦0:Cloud hosting for one class¦1:Cloud, AI and voice for one class⟧")}, budgeted at the 100-student tier ({money(pilot_month)}/month × 3, covering installation and the term)</span></td><td class="n">{money(pilot_shown)}</td></tr>
{(f'<tr{" class=cut" if "bridge" in CUT else ""}><td>{tx("⟦1:Kumi kept online for 3 months after the pilot¦2:Kumi kept running for 3 months after the pilot⟧")}<span class="why">{tx("⟦1:A bridge to the next funding: hosting, AI and voice, without support¦2:A bridge to the next funding: cloud, AI, voice and support⟧")} at the 100-student tier ({money(bridge_month)}/month × 3)</span></td><td class="n">{money(bridge_shown)}</td></tr>') if TIER >= 1 else ''}
<tr><td>Management fee — 10% of labour<span class="why">Professional indemnity and liability insurance, accounting, administration and company overhead.</span></td><td class="n">{money(mgmt)}</td></tr>
<tr><td>Contingency — 15% of direct costs<span class="why">Replaces per-task padding. Covers tasks that run long, rework, conditions at the school, Pijin quality, and exchange-rate movement. Drawn only with written approval; unused contingency is not billed.</span></td><td class="n">{money(cont)}</td></tr>
<tr class="g"><td>Total investment, excluding GST</td><td class="n">{money(grand)}</td></tr>
</table></div>
<h2>Optional add-ons — not in the total</h2>
<p class="h2sub">Left out of the base model to keep it lean. Each one can be added back at the price shown, which includes the management fee and contingency.</p>
<div class="card"><table><tr><th>Add-on</th><th>What it adds</th><th class="n">Work</th><th class="n">Cost</th></tr>""")
for name, desc, alloc, tp, note, cost, weeks in addon_rows:
    A(f"<tr><td><b>{E(name)}</b></td><td>{E(desc)}{(' <span class=src>(' + E(note) + ')</span>') if note else ''}</td><td class='n'>{wk(weeks)} wk</td><td class='n'>{money(cost)}</td></tr>")
A(f"<tr class='tot'><td colspan='3'>All add-ons together</td><td class='n'>{money(sum(x[5] for x in addon_rows))}</td></tr></table></div>")

A("""<h2>Payment schedule — paid before each stage</h2>
<div class="h2sub"><ul>
<li>Each payment is made before its stage starts.</li>
<li>Work on a stage starts once its payment is received.</li>
<li>Each payment after the first is released when the previous stage is signed off.</li>
<li>Each stage’s deliverables are submitted a week before it ends, so review and payment are done before the next stage starts.</li>
<li>The contingency is held back. It is paid only for changes you approve in writing.</li>
</ul></div>
<div class="card"><table><tr><th>Payment</th><th>When</th><th>Released once</th><th>Pays for</th><th class="n">Share</th><th class="n">Amount</th></tr>""")
for i, (n, when, gate, what) in enumerate(PAYMENTS):
    A(f"<tr><td><b>{n}</b></td><td style='white-space:nowrap'>{E(when)}</td><td>{E(gate)}</td><td>{E(what)}</td><td class='n'>{PAY_PCT[i]}%</td><td class='n'>{money(PAY_SHOW[n])}</td></tr>")
A(f"<tr><td><b>Reserve</b></td><td>Any time</td><td>You approve a change in writing</td><td>Contingency, only if needed. Unused contingency is never paid.</td><td class='n'>{PAY_PCT[-1]}%</td><td class='n'>{money(round(cont))}</td></tr>")
A(f"<tr class='tot'><td colspan='4'>Total, including the contingency reserve</td><td class='n'>100%</td><td class='n'>{money(grand)}</td></tr></table></div>")

RUN_ROWS = [  # first tier, label, how it is worked out, key
 (0, "Cloud hosting", "App server, managed database, storage and backups, AWS Sydney", "host"),
 (1, "AI curation &amp; replies (Claude Haiku 4.5)", f"About {SESS} sessions per student per month; each session is 5 ⟦1:help¦2:voice⟧ exchanges plus 1 curation call, with prompt caching. About A${AI_PER*SESS*FX:.2f} per student [<a href=\"{SRC['claude'][1]}\">pricing</a>]", "ai"),
 (1, "⟦1:Narration¦2:Speech recognition and Kumi’s Tok Pisin voice⟧", "⟦1:Pre-generated during the build and stored on the computer: no running cost¦2:Our own models, running on the school’s computers: no per-minute cost⟧", "asr"),
 (1, "Kingi’s live voice (ElevenLabs)", f"Lesson narration is pre-generated; only live replies use credits. Priced by plan tier [<a href=\"{SRC['elevenlabs'][1]}\">pricing</a>]", "voice"),
 (0, "Code-signing certificate", "Annual cost spread across 12 months", "lic"),
]
A(f"""<h2>Running cost after the pilot — by number of students</h2>
<p class="h2sub">What it costs each month to keep Kingi running once it scales past the first class. Infrastructure is cheap; the support retainer is the main fixed cost, and it is shared across more students as schools are added. These are estimates at today’s vendor prices. The pilot measures real usage, and the post-pilot report updates these figures.</p>
<div class="card"><table>
<tr><th>Per month, AUD</th><th>How it’s worked out</th><th class="n">100 students</th><th class="n">200 students</th><th class="n">300 students</th></tr>""")
for t, label, how, key in RUN_ROWS:
    if t > TIER: continue
    cells = ''.join(f"<td class='n'>{money(r[key])}" + (f"<br><span class='src'>{E(r['tier'])}</span>" if key == 'voice' else '') + "</td>" for r in R)
    A(f"<tr class='r{t}'><td>{tx(label, esc=False)}</td><td>{tx(how, esc=False)}</td>{cells}</tr>")
A(f"""<tr class="tot"><td colspan="2">Infrastructure subtotal</td>{''.join(f"<td class='n'>{money(r['infra'])}</td>" for r in R)}</tr>
<tr><td>Support &amp; maintenance retainer</td><td>2 days a month, Software Engineer and QA, at A${RATE['SE']}/day</td>{''.join(f"<td class='n'>{money(r['support'])}</td>" for r in R)}</tr>
<tr class="tot"><td colspan="2">Total per month</td>{''.join(f"<td class='n'>{money(r['total'])}</td>" for r in R)}</tr>
<tr><td colspan="2"><b>Per student, per month</b> <span class='src'>(bold: with support · grey: infrastructure only)</span></td>{''.join(f"<td class='n'><b>{money(r['total']/r['n'],2)}</b><br><span class='src'>{money(r['infra']/r['n'],2)}</span></td>" for r in R)}</tr>
</table>{'<div class="note">The voice line steps up between 100 and 200 students when usage crosses into the next ElevenLabs plan. The step is real and has been left in rather than smoothed out.</div>' if TIER >= 1 else ''}</div>""")

ASSUME = [
 "The pilot school is in Port Moresby (National Capital District). A school outside the capital adds domestic flights and higher security costs.",
 "The pilot school and a comparison class are signed up in Phase 1. The school already has a desktop lab with desktops, internet and power. One Grade 3 class of about 30–40 students.",
 "⟦0:20 lessons: 2 subjects (numeracy and literacy) × 10 weeks, one one-hour lesson per subject per week, or 2 hours per child per week.¦3:30 lessons: 3 subjects × 10 weeks, one one-hour lesson per subject per week, or 3 hours per child per week.⟧",
 f"PNG school terms are about 10 weeks [<a href=\"{SRC['terms'][1]}\">source</a>]. The pilot starts at the start of a term. 2027 dates are confirmed with the school; the 2027 general election may move them.",
 "The school gives the pilot class lab time for ⟦0:2¦3:3⟧ hours per child each week, and the teacher’s time to run the sessions.",
 "One headset per child (up to 40), labelled with their name, plus 4 spares.",
 "About ⟦0:55,000¦3:80,000⟧ words translated into Pijin by AI, with the linguist verifying at around 7,000 words a day.",
 "[0-0] Lessons are read on screen and children answer by tap. There is no narration or AI help in the core.",
 "[1-1] Kumi speaks English, with narration made in ElevenLabs during the build; Tok Pisin is shown on screen. Children answer and ask for help by tap; Kumi’s live replies are spoken in English, or shown on screen in Tok Pisin.",
 "[2-2] Kumi’s Tok Pisin voice is built from about 6 hours of a voice actor’s recordings. English answers use an off-the-shelf speech model; Tok Pisin answers are by tap.",
 "[3] Tok Pisin speech is built from about 30 hours of scripted recordings by 20 adult speakers, and 6 hours from Kumi’s voice actor. Recognition is built for what the lessons need (answers, numbers, words and short requests); open conversation in Tok Pisin improves through the pilot.",
 "[0-0] Lessons are stored on the computer, so everything works offline.",
 "[1-1] Lessons, narration and offline help lines are stored on the computer, so lessons work offline. Live AI help needs the internet.",
 "[2] Speech recognition and Kumi’s voice run on the school computer, so voice works offline. Offline, Kumi helps from approved lines; open conversation needs the internet.",
 "The pilot school has a working internet connection for most lessons. Offline mode covers outages, not a school with no connection.",
 "School desktops have at least 8 GB of RAM, enough to run ⟦0:the lessons and narration¦2:Kumi’s speech recognition and voice alongside the lessons⟧.",
 "Phase 1 is run remotely, except the school agreement and site survey, which the local linguist handles in Port Moresby.",
 "The app is built on the existing Kumi prototype code (React), packaged as a Windows app.",
 f"[1] Claude is used through Amazon Bedrock’s Australian region, so AI requests are processed in Australia [<a href=\"{SRC['bedrock'][1]}\">source</a>]. ⟦1:Kumi’s live voice service (ElevenLabs) is overseas¦2:The English voice service (ElevenLabs) is overseas⟧; parents are told in the consent form.",
 "The team is named before the contract is signed. All work is kept in shared repositories with documentation, so a replacement can pick it up if someone leaves.",
 "The installer travels on the right PNG visa for business. Local team members and speakers are paid in kina.",
 "Pre/post tests run inside the app, supervised by the teacher.",
 f"A core team of {n_core}, plus {team_extra}, carries the full workload.",
]
EXCL = [
 "School computers, electricity and internet.",
 "[0-0] Kumi’s narration, live AI help, adaptive practice and offline help bank (in Tier 1).",
 "[0-0] Voice answers and Kumi’s own voice (in Tier 2).",
 "[0-0] Tok Pisin speech recognition and personal development lessons (in Tier 3).",
 "[1-2] Personal development lessons and a 3rd hour each week (in Tier 3).",
 "[1-2] Tok Pisin speech recognition (in Tier 3).",
 "[1-1] Voice answers in English, and a weekly review of Kumi’s conversations (in Tier 2).",
 "[1-1] A Tok Pisin voice: in Tier 1 Kumi speaks English only (Kumi’s own Tok Pisin voice is in Tier 2).",
 "[1-1] External education specialist sign-off (in Tier 2).",
 "The optional add-ons above: Mac build, on-device AI model for schools without internet.",
 "Native iPhone or Android apps.",
 f"Grades 4–6 content (about {money(extra_lesson_all)} per lesson to add).",
 "Training a language model from scratch, or owning AI hardware.",
 "Running costs after the 3-month bridge (shown above, funded separately).",
 "GST.",
]
A(f"""<h2>Assumptions and exclusions</h2>
<div class="stack">
<div class="card"><div class="card-h"><div class="t">Assumptions</div></div><div style="padding:14px 18px"><ul class="plain">{lis(ASSUME, esc=False)}</ul></div></div>
<div class="card"><div class="card-h"><div class="t">Not included</div></div><div style="padding:14px 18px"><ul class="plain">{lis(EXCL, esc=False, hl=False)}</ul></div></div>
</div>
<section class="internal-only" id="team-rates"><h2>Appendix — team rates (internal, team view only)</h2>
<p class="h2sub">Not for investors. Shown only when this page is opened with #team at the end of its address. Each role is matched to a discipline group and seniority level in DFAT’s Aid Adviser Remuneration Framework and priced 10% below its Market Reference Point (MRP), the highest rate DFAT pays without special approval. Australian private-market contractor rates are shown for comparison.</p>
<div class="h2sub"><p>How each task is priced:</p>
<ul>
<li>Cost = weeks × 40 hours × the role’s hourly rate.</li>
<li>Each task is priced at its likely time, with no padding.</li>
<li>The contingency covers any overruns.</li>
</ul></div>
<div class="card"><table>
<tr><th>Role</th><th>DFAT discipline · level</th><th class="n">Rate / hour</th><th class="n">Per day (8 h)</th><th class="n">DFAT MRP / day</th><th>AU market / day, direct-hire</th><th class="n">Allocated</th></tr>""")
for r in ROLES:
    name, grp, mrp = DFAT[r]; w, c = role_tot[r]
    A(f"<tr><td><b>{E(name)}</b></td><td>{E(grp)}</td><td class='n'><b>{money(HOURLY[r])}</b></td><td class='n'>{money(RATE[r])}</td><td class='n'>{money(mrp)}</td><td>{E(MARKET.get(r,'— no reliable source'))}</td><td class='n'>{wk(w)} wk · {money(c)}</td></tr>")
A(f"""<tr class="tot"><td colspan="6">Total labour</td><td class="n">{wk(lab_weeks)} wk · {money(lab_total)}</td></tr></table>
<div class="note">The Pijin Linguist and the Grade 3 Teacher are recruited locally in PNG. DFAT caps locally recruited roles at the MRP, so the Entry-level rate is used as a ceiling and the actual local rate is likely lower. Rates are confirmed with named team members before contract. Sources: <a href='{SRC['dfat_rates'][1]}'>DFAT adviser rate tables 2025–26</a>; <a href='{SRC['dfat_arf'][1]}'>DFAT Aid Adviser Remuneration Framework</a>; <a href='{SRC['cloudcolleague'][1]}'>CloudColleague 2026 AU contractor rates</a>; <a href='{SRC['hays'][1]}'>Hays FY25/26 IT contractor rates</a>.</div></div></section>
<h2>Sources</h2><div class='card'><div style='padding:14px 18px'><ul class='plain'>""")
for k in ["dfat_cpp","headset","headset2","terms","bedrock","claude","elevenlabs","sslinsights","devclass","apple","gpu","flights","hotels","smartraveller","lpa","png_data","ldc"]:
    t, u = SRC[k]; A(f"<li><a href='{u}'>{E(t)}</a></li>")
A("</ul></div></div>")
A(f"<footer>Sing Singh AI · Kingi · PNG Grade 3 pilot · Version 2 · {TIER_NAME}<br>Bottom-up estimate for investor review. Final contract figures follow named team rates and current vendor quotes.</footer></div></body></html>")

html_out = ''.join(o).replace('Pijin', LANG).replace('Kingi', 'Kumi')
html_out = html_out.replace('<section class="internal-only" id="team-rates">', '<script>(function(){function f(){document.documentElement.classList.toggle("show-internal", location.hash==="#team");}f();addEventListener("hashchange",f);})();</script><section class="internal-only" id="team-rates">', 1)
html_out = paginate(html_out)
if PART:   # just this tier's sheets, for build_tiers.py
    a = html_out.index('<section class="sheet">'); b = html_out.rindex('</section>') + len('</section>')
    html_out = html_out[a:b].replace('id="team-rates"', f'id="team-rates-{TIER}"')
else:
    html_out = html_out.replace('</body></html>', open('cmt_widget.html', encoding='utf8').read() + '</body></html>')
open(OUT, 'w', encoding='utf8').write(html_out)
print(json.dumps(dict(tier=TIER, labour=round(lab_total), weeks=lab_weeks, tasks=N_TASKS, roles=N_ROLES, tp=round(tp_total), travel=round(travel_total),
  pilot_run=round(pilot_running), bridge=round(bridge), mgmt=round(mgmt), cont=round(cont), grand=round(grand),
  pay={n: PAY_SHOW[n] for n, *_ in PAYMENTS},
  run=[(r['n'], round(r['total']), round(r['total']/r['n'],2)) for r in R],
  phases={ph: round(ep_lab(ph)) for ph in EP},
  task_cost={code: sum(l[2] for l in ls) for ph in rows_by_ep for code, _, _, ls, _ in rows_by_ep[ph] if ls and code not in CUT},
  tp_cost={item: c for item, c, *_ in TP_IN}, travel_exact=travel_total, pilot_exact=pilot_running, bridge_exact=bridge, grand_exact=grand,
  per_lesson=extra_lesson_all, subjects=3 if TIER >= 3 else 2, lessons=10,
  direct_exact=direct, mgmt_exact=mgmt, per_lesson_labour=extra_lesson, bridge_month_exact=bridge_month if TIER >= 1 else 0.0,
  trip_labour=5*RATE["SE"], trip_other=travel_total,
  addons=[[n, sum(w*5*RATE[r] for r, w in al), tp] for n, d, al, tp, note in ADDONS],
  run_params=dict(host=HOST, lic=LIC, support=SUPPORT, ai_stu=AI_STU, credits_per_student=5*150*SESS*0.5,
                  voice=[[500_000, 99*FX], [2_000_000, 330*FX], [None, 1320*FX]] if TIER >= 2 else []))))
