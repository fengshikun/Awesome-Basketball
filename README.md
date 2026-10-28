# Awesome-Basketball 🏀

A curated collection of **basketball video understanding** papers, datasets, and benchmarks, organized by year.

[![Website](https://img.shields.io/badge/Website-Research%20Library-2d5845)](https://fengshikun.github.io/Awesome-Basketball/)
[![Papers](https://img.shields.io/badge/Entries-33-b56435)](data/papers.json)
[![Last curated](https://img.shields.io/badge/Last%20curated-2026--10--28-68756a)](data/papers.json)
[![Contributions welcome](https://img.shields.io/badge/Contributions-welcome-2d5845)](CONTRIBUTING.md)

## Entry points

- **[Searchable website](https://fengshikun.github.io/Awesome-Basketball/)** — year navigation, keyword search, task and scope filters, per-paper citations, and filtered exports.
- **[BibTeX bibliography](data/basketball.bib)** · **[Structured catalog](data/papers.json)** · **[Contribution guide](CONTRIBUTING.md)**
- **中文说明：** 本库围绕篮球视频理解整理文献，包含篮球专用数据集、含篮球的多体育评测、动作指导以及跟踪与几何等基础任务；按年份倒序分组。

## Scope and reading notes

- **Basketball** = basketball-focused work. **Multi-sport** = work that includes basketball alongside other sports or activities.
- Published papers use the verified venue year; preprints use their release year. Earlier preprint years are recorded separately as `first_year`. Multiple versions of the same work have one entry.
- **Preprint** and **Project** are explicitly marked. Resource-only projects are not presented as peer-reviewed papers.
- Total dataset sizes in multi-sport or multimodal papers are not basketball-video-only counts. Read each task's released annotations and access conditions before comparison.
- Ego-Exo4D, ExpertAF, and EE4D-DescCoach share data lineage. Player tracking IDs, player names, and jersey-number recognition are different evaluation targets.
- The catalog stores primary-source links and the last bibliographic review date. Inclusion does not certify every claim, dataset availability, or license. No videos or paper PDFs are redistributed here.

## Task coverage

Action and event recognition · player identity · temporal and spatial grounding · captioning · VideoQA · human interactions · rules and officiating · tactical reasoning · prediction · skill assessment · coaching feedback · multi-view understanding · streaming · retrieval · tracking and geometry.

## Surveys

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![Findings of ACL 2026](https://img.shields.io/badge/Findings%20of%20ACL%202026-2d5845) | [A Survey of Large Models in Sports](https://aclanthology.org/2026.findings-acl.1851/)<br><sub>Multi-sport · Reviews sports applications, datasets, and challenges for large language and multimodal models.</sub> | [Code / Resource](https://github.com/Road2Redemption/Awesome_Large_Models_In_Sports1) | Survey |
| ![Image and Vision Computing 2025](https://img.shields.io/badge/Image%20and%20Vision%20Computing%202025-2d5845) | [Advancements in basketball action recognition: Datasets, methods, explainability, and synthetic data applications](https://doi.org/10.1016/j.imavis.2025.105689)<br><sub>Basketball · Surveys basketball action recognition datasets and methods, including explainability and synthetic data.</sub> | — | Survey, Action recognition |

## Papers and resources by year

[2026](#2026) · [2025](#2025) · [2024](#2024) · [2023](#2023) · [2022](#2022) · [2021](#2021) · [2020](#2020) · [2018](#2018) · [2017](#2017) · [2016](#2016)

### 2026

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![Findings of ACL 2026](https://img.shields.io/badge/Findings%20of%20ACL%202026-2d5845) | [A Survey of Large Models in Sports](https://aclanthology.org/2026.findings-acl.1851/)<br><sub>Multi-sport · Reviews sports applications, datasets, and challenges for large language and multimodal models.</sub> | [Code / Resource](https://github.com/Road2Redemption/Awesome_Large_Models_In_Sports1) | Survey |
| ![CVIU 2026](https://img.shields.io/badge/CVIU%202026-2d5845) | [BARD: A Basketball Action Recognition Dataset for multi-label classification](https://www.sciencedirect.com/science/article/pii/S1077314226000809)<br><sub>Basketball · Represents multiple basketball actions and outcomes in a clip with jersey numbers, team colors, and assist-related fields.</sub> | [Code / Resource](https://github.com/GabrieleGiudic/BARD) | **BARD**<br>Event understanding, Player identity, Action recognition |
| ![BMVC 2026](https://img.shields.io/badge/BMVC%202026-2d5845) | [BasketEvent: Understanding Who Did What and When in Basketball Videos](https://arxiv.org/abs/2607.21267)<br><sub>Basketball · Player-centric NBA event understanding with event-to-player association and temporal evidence.</sub> | [Code / Resource](https://github.com/zhangyu2003/BasketEvent) · [Project](https://zhangyu2003.github.io/BasketEvent/) | **BasketEvent**<br>Event understanding, Player identity, Temporal grounding |
| ![arXiv 2026](https://img.shields.io/badge/arXiv%202026-b56435) | [Beyond the Single Camera: Agentic Multi-View Reasoning in Sports Video Understanding](https://arxiv.org/abs/2607.11844) · *Preprint*<br><sub>Multi-sport · Introduces SportMV-Bench to combine evidence across camera views for perception and adjudication.</sub> | — | **SportMV-Bench**<br>Video QA, Rules & officiating, Multi-view |
| ![arXiv 2026](https://img.shields.io/badge/arXiv%202026-b56435) | [NBA_Streaming: A Large-Scale Benchmark for Fine-Grained Basketball Commentary Generation in Continuous Streams](https://arxiv.org/abs/2608.09200) · *Preprint*<br><sub>Basketball · Evaluates event timing, factual grounding, response reliability, and fine-grained commentary under causal streaming constraints.</sub> | — | **NBA_Streaming**<br>Streaming, Captioning, Player identity, Temporal grounding |
| ![Project 2026](https://img.shields.io/badge/Project%202026-68756a) | [NBA-Event-av Dataset](https://github.com/holhouse/NBA-event-datasets) · *Project*<br><sub>Basketball · Result-oriented basketball event recognition with visual and audio cues across 18 event classes.</sub> | [Code / Resource](https://github.com/holhouse/NBA-event-datasets) | **NBA-Event-av**<br>Action recognition, Event understanding |
| ![arXiv 2026](https://img.shields.io/badge/arXiv%202026-b56435) | [PL-NBA: A Possession-level Universal Basketball Video Dataset Supporting Multiple Visual Understanding Tasks](https://arxiv.org/abs/2608.19646) · *Preprint*<br><sub>Basketball · Uses complete offensive possessions for event recognition, captioning, temporal action localization, and action anticipation.</sub> | [Code / Resource](https://github.com/holhouse/PL-NBA-Dataset) | **PL-NBA**<br>Event understanding, Captioning, Temporal grounding, Prediction |
| ![arXiv 2026](https://img.shields.io/badge/arXiv%202026-b56435) | [RefereeBench: Are Video MLLMs Ready to be Multi-Sport Referees](https://arxiv.org/abs/2604.15736) · *Preprint*<br><sub>Multi-sport · Evaluates foul existence, classification, penalty reasoning, entity perception, and temporal evidence grounding.</sub> | — | **RefereeBench**<br>Video QA, Rules & officiating, Temporal grounding |
| ![ICLR 2026](https://img.shields.io/badge/ICLR%202026-2d5845) | [SportR: A Benchmark for Multimodal Large Language Model Reasoning in Sports](https://openreview.net/forum?id=cPCGB402ff)<br><sub>Multi-sport · Progressive questions test infractions, penalties, and tactics with human-authored reasoning annotations.</sub> | [Code / Resource](https://github.com/chili-lab/SportR) | **SportR**<br>Video QA, Rules & officiating, Tactics & reasoning |
| ![IJCV 2026](https://img.shields.io/badge/IJCV%202026-2d5845) | [Sports-QA: A Large-Scale Video Question Answering Benchmark for Complex and Professional Sports](https://link.springer.com/article/10.1007/s11263-026-02734-1)<br><sub>Multi-sport · Sports video QA covering descriptions, chronology, causality, and counterfactual conditions.</sub> | [Code / Resource](https://github.com/HopLee6/Sports-QA) | **Sports-QA**<br>Video QA, Tactics & reasoning |
| ![arXiv 2026](https://img.shields.io/badge/arXiv%202026-b56435) | [SVI-Bench: A Dynamic Microworld for Strategic Video Intelligence](https://arxiv.org/abs/2605.31529) · *Preprint*<br><sub>Multi-sport · Organizes sports video intelligence into perception, reasoning, simulation, and agency across nine tasks.</sub> | [Project](https://svi-bench.github.io/) | **SVI-Bench**<br>Event understanding, Video QA, Tactics & reasoning, Prediction, Retrieval |
| ![AAAI 2026](https://img.shields.io/badge/AAAI%202026-2d5845) | [TechCoach: Towards Technical-Point-Aware Descriptive Action Coaching](https://ojs.aaai.org/index.php/AAAI/article/view/37601)<br><sub>Multi-sport · Provides action quality scores and hierarchical coaching commentary at technical-point and instance levels.</sub> | — | **EE4D-DescCoach**<br>Coaching & feedback, Skill assessment |
| ![arXiv 2026](https://img.shields.io/badge/arXiv%202026-b56435) | [Towards Comprehensive Basketball Understanding](https://arxiv.org/abs/2608.23435) · *Preprint*<br><sub>Basketball · Combines basketball knowledge, broadcast perception, and spatiotemporal event understanding across ten tasks.</sub> | — | **BasketballBench**<br>Video QA, Event understanding, Player identity, Temporal grounding |
| ![ECCV 2026](https://img.shields.io/badge/ECCV%202026-2d5845) | [Towards Temporal Compositional Reasoning in Long-Form Sports Videos](https://arxiv.org/abs/2604.22226)<br><sub>Multi-sport · Introduces SportsTime and Chain-of-Time reasoning for composing temporally dispersed evidence in long sports videos.</sub> | [Code / Resource](https://github.com/ustiniansy/SportsTime) | **SportsTime**<br>Video QA, Temporal grounding, Tactics & reasoning |

### 2025

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![Image and Vision Computing 2025](https://img.shields.io/badge/Image%20and%20Vision%20Computing%202025-2d5845) | [Advancements in basketball action recognition: Datasets, methods, explainability, and synthetic data applications](https://doi.org/10.1016/j.imavis.2025.105689)<br><sub>Basketball · Surveys basketball action recognition datasets and methods, including explainability and synthetic data.</sub> | — | Survey, Action recognition |
| ![CVPR 2025](https://img.shields.io/badge/CVPR%202025-2d5845) | [BASKET: A Large-Scale Video Dataset for Fine-Grained Skill Estimation](https://arxiv.org/abs/2503.20781)<br><sub>Basketball · Predicts five-level ratings for 20 basketball skills from long player highlight videos.</sub> | [Code / Resource](https://github.com/yulupan00/BASKET) · [Project](https://sites.google.com/cs.unc.edu/basket) | **BASKET**<br>Skill assessment |
| ![CVPR 2025](https://img.shields.io/badge/CVPR%202025-2d5845) | [ExpertAF: Expert Actionable Feedback from Video](https://arxiv.org/abs/2408.00672)<br><sub>Multi-sport · Generates actionable expert feedback and supports corrected visual demonstrations through retrieval and pose generation.</sub> | — | **Ego-Exo4D / ExpertAF subset**<br>Coaching & feedback, Skill assessment, Retrieval |
| ![CVPR 2025](https://img.shields.io/badge/CVPR%202025-2d5845) | [LiveCC: Learning Video LLM with Streaming Speech Transcription at Scale](https://arxiv.org/abs/2504.16030)<br><sub>Multi-sport · Introduces LiveSports-3K with commentary generation and multiple-choice Who, When, and What questions.</sub> | [Code / Resource](https://github.com/showlab/livecc) · [Project](https://showlab.github.io/livecc/) | **LiveSports-3K**<br>Streaming, Captioning, Video QA |
| ![ICCV 2025](https://img.shields.io/badge/ICCV%202025-2d5845) | [Player-Centric Multimodal Prompt Generation for Large Language Model Based Identity-Aware Basketball Video Captioning](https://arxiv.org/abs/2507.20163)<br><sub>Basketball · Introduces NBA-Identity for basketball captions that correctly bind player identities to observed events.</sub> | [Code / Resource](https://github.com/Zeyu1226-mt/LLM-IAVC) | **NBA-Identity**<br>Captioning, Player identity, Event understanding |
| ![ICLR 2025](https://img.shields.io/badge/ICLR%202025-2d5845) | [SPORTU: A Comprehensive Sports Understanding Benchmark for Multimodal Large Language Models](https://arxiv.org/abs/2410.08474)<br><sub>Multi-sport · Tests sports perception and rule application with a video component and a separate text-only component.</sub> | [Code / Resource](https://github.com/chili-lab/SPORTU) | **SPORTU-video, SPORTU-text**<br>Video QA, Rules & officiating, Tactics & reasoning |

### 2024

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![CVPR 2024](https://img.shields.io/badge/CVPR%202024-2d5845) | [Ego-Exo4D: Understanding Skilled Human Activity from First- and Third-Person Perspectives](https://arxiv.org/abs/2311.18259)<br><sub>Multi-sport · Synchronized ego and exo videos support skilled activity understanding, proficiency estimation, and expert critique.</sub> | [Project](https://ego-exo4d-data.org/) | **Ego-Exo4D**<br>Skill assessment, Coaching & feedback, Multi-view |
| ![CVPR 2024](https://img.shields.io/badge/CVPR%202024-2d5845) | [FineSports: A Multi-person Hierarchical Sports Video Dataset for Fine-grained Action Understanding](https://openaccess.thecvf.com/content/CVPR2024/html/Xu_FineSports_A_Multi-person_Hierarchical_Sports_Video_Dataset_for_Fine-grained_Action_CVPR_2024_paper.html)<br><sub>Basketball · Fine-grained basketball action understanding with semantic labels and spatiotemporal action tubes.</sub> | [Code / Resource](https://github.com/PKU-ICST-MIPL/FineSports_CVPR2024) | **FineSports**<br>Action recognition, Spatial grounding, Temporal grounding |
| ![CVPR 2024](https://img.shields.io/badge/CVPR%202024-2d5845) | [SportsHHI: A Dataset for Human-Human Interaction Detection in Sports Videos](https://arxiv.org/abs/2404.04565)<br><sub>Multi-sport · Detects human pairs and their high-level interactions in basketball and volleyball videos.</sub> | [Code / Resource](https://github.com/MCG-NJU/SportsHHI) | **SportsHHI**<br>Human interaction, Spatial grounding |
| ![CVPR Workshops 2024](https://img.shields.io/badge/CVPR%20Workshops%202024-2d5845) | [TeamTrack: A Dataset for Multi-Sport Multi-Object Tracking in Full-pitch Videos](https://arxiv.org/abs/2404.13868)<br><sub>Multi-sport · Benchmarks player tracking in full-pitch basketball, soccer, and handball views.</sub> | — | **TeamTrack**<br>Tracking & geometry |

### 2023

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![ICCV 2023](https://img.shields.io/badge/ICCV%202023-2d5845) | [SportsMOT: A Large Multi-Object Tracking Dataset in Multiple Sports Scenes](https://arxiv.org/abs/2304.05170)<br><sub>Multi-sport · Tracks all on-court players through fast motion, similar appearances, and frequent occlusions.</sub> | — | **SportsMOT**<br>Tracking & geometry |

### 2022

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![ACM MMSports 2022](https://img.shields.io/badge/ACM%20MMSports%202022-2d5845) | [DeepSportradar-v1: Computer Vision Dataset for Sports Understanding with High Quality Annotations](https://arxiv.org/abs/2208.08190)<br><sub>Basketball · Benchmarks 3D ball localization, camera calibration, player instance segmentation, and re-identification.</sub> | — | **DeepSportradar-v1**<br>Tracking & geometry, Player identity, Spatial grounding |
| ![ECCV 2022](https://img.shields.io/badge/ECCV%202022-2d5845) | [Sports Video Analysis on Large-Scale Data](https://arxiv.org/abs/2208.04897)<br><sub>Basketball · Introduces NSVA for expert-style basketball captions, fine-grained actions, and salient player identification.</sub> | [Code / Resource](https://github.com/jackwu502/NSVA) | **NSVA**<br>Captioning, Action recognition, Player identity |

### 2021

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![CS & IT 2021](https://img.shields.io/badge/CS%20%26%20IT%202021-2d5845) | [Basketball-51: A Video Dataset for Activity Recognition in the Basketball Game](https://aircconline.com/csit/papers/vol11/csit110712.pdf)<br><sub>Basketball · Classifies shot types and make-or-miss outcomes from broadcast basketball clips.</sub> | — | **Basketball-51**<br>Action recognition, Event understanding |
| ![ICCV 2021](https://img.shields.io/badge/ICCV%202021-2d5845) | [MultiSports: A Multi-Person Video Dataset of Spatio-Temporally Localized Sports Actions](https://arxiv.org/abs/2105.07404)<br><sub>Multi-sport · Dense action tubes test fine-grained multi-person sports action detection, including a basketball subset.</sub> | [Project](https://deeperaction.github.io/multisports/) | **MultiSports**<br>Action recognition, Spatial grounding, Temporal grounding |

### 2020

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![ECCV 2020](https://img.shields.io/badge/ECCV%202020-2d5845) | [Social Adaptive Module for Weakly-supervised Group Activity Recognition](https://arxiv.org/abs/2007.09470)<br><sub>Basketball · Introduces the NBA dataset for group activity recognition using clip-level supervision.</sub> | — | **NBA (GAR)**<br>Action recognition, Human interaction |

### 2018

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![Project 2018](https://img.shields.io/badge/Project%202018-68756a) | [SpaceJam: a Dataset for Basketball Action Recognition](https://github.com/simonefrancia/SpaceJam) · *Project*<br><sub>Basketball · Provides paired single-player action clips and joint coordinates for basketball action classification.</sub> | [Code / Resource](https://github.com/simonefrancia/SpaceJam) | **SpaceJam**<br>Action recognition |

### 2017

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![ICCV 2017](https://img.shields.io/badge/ICCV%202017-2d5845) | [Am I a Baller? Basketball Performance Assessment from First-Person Videos](https://arxiv.org/abs/1611.05365)<br><sub>Basketball · Assesses player performance from first-person video with expert pairwise preferences and atomic basketball events.</sub> | — | Skill assessment |

### 2016

| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |
|---|---|---|---|
| ![CVPR 2016](https://img.shields.io/badge/CVPR%202016-2d5845) | [Detecting Events and Key Actors in Multi-Person Videos](https://ai.stanford.edu/~vigneshr/bball_attention_v1_arxiv.pdf)<br><sub>Basketball · Detects basketball events and attends to the key actors responsible for them in long game videos.</sub> | — | **NCAA Basketball**<br>Event understanding, Temporal grounding, Player identity |


## Maintain the library

Edit **`data/papers.json`**, then regenerate all views from the same source:

```sh
npm run check
npm test
npm run build
npm run dev
```

Open the printed local URL. The website has no runtime dependencies and uses relative asset paths for GitHub Pages project hosting. CI validates changes and deploys the generated `docs/` folder from `main`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the data fields, inclusion policy, and deployment details. To suggest a paper, [open an issue](https://github.com/fengshikun/Awesome-Basketball/issues/new?template=paper.yml).

## Acknowledgments

The bibliography-table format and searchable-library idea are inspired by [Awesome-AQA](https://github.com/ZhouKanglei/Awesome-AQA) and its [AQA-Survey website](https://zhoukanglei.github.io/AQA-Survey/). This repository uses its own implementation and basketball-specific annotations. Credit for all research, datasets, and linked resources belongs to the original authors.

## License

Original website code and original curation text: [MIT](LICENSE). Linked papers, datasets, media, and upstream resources retain their own licenses and access conditions.
