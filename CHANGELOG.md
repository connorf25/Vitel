# Changelog

# [1.21.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.20.2...v1.21.0) (2025-03-27)


### Features

* Service({debugTiming:Boolean}) ([50d9841](https://github.com/MomsFriendlyDevCo/Vitel/commit/50d98415ac9537819e6a2b88126e3fde958648f0))

## [1.20.2](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.20.1...v1.20.2) (2025-03-12)


### Bug Fixes

* **$prompt:** Always default promise{Resolve,Reject}() to a No-op function as it makes handling closing nested models easier ([968a4c0](https://github.com/MomsFriendlyDevCo/Vitel/commit/968a4c053333e7853809f3a02758a4c6ad2c3867))
* **$prompt:** Correctly hide dialogs that are in the middle of animating open ([3422906](https://github.com/MomsFriendlyDevCo/Vitel/commit/3422906a155e681e6fc86ae8b393502bb85296cc))

## [1.20.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.20.0...v1.20.1) (2025-01-30)


### Bug Fixes

* **<btn-states>:** STFU when complaining about undefined values and always assume first state ([fc4fcbe](https://github.com/MomsFriendlyDevCo/Vitel/commit/fc4fcbe2095c2738b8f58a26f7ab5d1d77d3faef))

# [1.20.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.19.0...v1.20.0) (2025-01-22)


### Features

* **<btn-states>:** <btn-states> now supports tooltips ([6d4ff36](https://github.com/MomsFriendlyDevCo/Vitel/commit/6d4ff36fd27fca6b742f6668cfb224bec35cc399))

# [1.19.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.18.0...v1.19.0) (2025-01-15)


### Features

* **<btn-promise>:** Added $props.minTime ([461f3eb](https://github.com/MomsFriendlyDevCo/Vitel/commit/461f3eb425bc4e8d6dbf19d6fd7c9089cc71d026))
* **$supabase:** Added $supabase.rpc() wrapper for RPC calls ([fa196af](https://github.com/MomsFriendlyDevCo/Vitel/commit/fa196af705fb76966cae690d085e66229430db8f))

# [1.18.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.17.0...v1.18.0) (2025-01-09)


### Features

* <btn-states/> component ([c13881a](https://github.com/MomsFriendlyDevCo/Vitel/commit/c13881a68b6b5f12ab2681e6f25b99365714e75d))

# [1.17.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.16.4...v1.17.0) (2024-12-19)


### Features

* Added <avatar-gravatar/> ([d131df5](https://github.com/MomsFriendlyDevCo/Vitel/commit/d131df58b91eb45da9cafe786ccd811c2f623efd))

## [1.16.4](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.16.3...v1.16.4) (2024-12-18)


### Bug Fixes

* **$idb:** Dont try and return a non-existant value when calling unset() ([93bb3ae](https://github.com/MomsFriendlyDevCo/Vitel/commit/93bb3aec36ae4af003ed5fdc916a5071bb58a9c9))

## [1.16.3](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.16.2...v1.16.3) (2024-12-18)

## [1.16.2](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.16.1...v1.16.2) (2024-11-28)


### Bug Fixes

* **$prompt:** Rewrite $prompt dialog stacking to work without .toReversed() as this doenst always seem to be available ([7e4636a](https://github.com/MomsFriendlyDevCo/Vitel/commit/7e4636aab46f326e7374c5ca91d2831dc92657ad))
* **v-table:** Incorrect contexting when computing the baseUrl ([8573d96](https://github.com/MomsFriendlyDevCo/Vitel/commit/8573d96ec209ea18fe7f3e837a2aa09993e561b3))

## [1.16.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.16.0...v1.16.1) (2024-11-19)

# [1.16.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.15.0...v1.16.0) (2024-11-18)


### Bug Fixes

* **$lockRocket:** Make the identify function use a callback method to identify the user to prevent race conditions ([7e33966](https://github.com/MomsFriendlyDevCo/Vitel/commit/7e339667df551b08629c8684c4fe5fb99a9043e0))
* **$logrocket:** Typo ([61a99e4](https://github.com/MomsFriendlyDevCo/Vitel/commit/61a99e4e388ec02446a454b5134e94b9fbaad380))
* **LogRocket:** Debug log user ident updates ([58d7f9b](https://github.com/MomsFriendlyDevCo/Vitel/commit/58d7f9b4c77c798de653648190bcdf6658d4944e))


### Features

* **<dynamic>:** <Dynamic> now supports :ref-handle as a means to refer to the inner component ([bc0b031](https://github.com/MomsFriendlyDevCo/Vitel/commit/bc0b03163b087133e86aa37e23ef01bd09310319))
* **$prompt:** $prompt click handlers now pass context + arg of the dynamic element being used ([4cc8dfa](https://github.com/MomsFriendlyDevCo/Vitel/commit/4cc8dfa733cde34aa097d55f15c89aa8277864e4))

# [1.15.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.14.1...v1.15.0) (2024-11-10)


### Bug Fixes

* **$toast:** Also ignore "CANCEL" response codes within $toast.catch ([c57fd93](https://github.com/MomsFriendlyDevCo/Vitel/commit/c57fd93dae3b2c2b0b8519bdcf461ffb2935b568))


### Features

* **btn-promise:** <btn-promise :action="cb"/> component ([4cf9c3b](https://github.com/MomsFriendlyDevCo/Vitel/commit/4cf9c3b7adeb28fa3f66077291f360a41e41a909))

## [1.14.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.14.0...v1.14.1) (2024-11-01)

# [1.14.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.13.1...v1.14.0) (2024-10-24)


### Features

* **<select-icon>:** Basic implementation of the icon selector component ([de3f780](https://github.com/MomsFriendlyDevCo/Vitel/commit/de3f780aaf005dfd636aec55f645519c604217ab))
* **<select-icon>:** Misc fixes to tooltip handling ([d256a43](https://github.com/MomsFriendlyDevCo/Vitel/commit/d256a43fc1f986d5b2e821b001f115b37f5cbb4d))

# [1.13.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.12.4...v1.13.0) (2024-09-25)


### Bug Fixes

* **$idb:** Remove debugger stop when calling $idb.clear() ([f91d03a](https://github.com/MomsFriendlyDevCo/Vitel/commit/f91d03afe2c47997a0b253548faba3cf40649c80))
* Less chatter with v-autocomplete changes ([b5f93e6](https://github.com/MomsFriendlyDevCo/Vitel/commit/b5f93e6974271724582d0dd89c358347e97e0913))
* **v-animate:** Debug should default to off ([e853f00](https://github.com/MomsFriendlyDevCo/Vitel/commit/e853f001e969a793b7334573bd30496b72615312))


### Features

* **<loading>:** Added subtitle display ([8100b6c](https://github.com/MomsFriendlyDevCo/Vitel/commit/8100b6c30f35d44c1eea0652f2fae022124cd866))

## [1.12.4](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.12.3...v1.12.4) (2024-09-06)


### Bug Fixes

* **$stateIdb:** Deep clone values (if they are a proxy) before saving via $set ([d30af9a](https://github.com/MomsFriendlyDevCo/Vitel/commit/d30af9adffe3a7fce2a17972a579846c4c8c24d3))
* Debugging services now auto-clones proxy objects for better output ([8a38180](https://github.com/MomsFriendlyDevCo/Vitel/commit/8a38180964fa18bb431dfcb0556bcadaaa871949))

## [1.12.3](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.12.2...v1.12.3) (2024-09-05)


### Bug Fixes

* **$stateIdb:** Wrong version extraction with .databases() API and DB doesnt exist yet ([20b2725](https://github.com/MomsFriendlyDevCo/Vitel/commit/20b272570532baf09fb613c0d40cf45249c19f5c))

## [1.12.2](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.12.1...v1.12.2) (2024-09-05)


### Bug Fixes

* Wrap indexedDB.databases() in case Firefox version is <126 ([beec1d5](https://github.com/MomsFriendlyDevCo/Vitel/commit/beec1d50d02fc4b9061b07e7124c86ce80ee3390))

## [1.12.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.12.0...v1.12.1) (2024-08-14)


### Bug Fixes

* **$stateIdb:** Transaction support + block detection for $stateIdb.clear() ([383bea7](https://github.com/MomsFriendlyDevCo/Vitel/commit/383bea7d6e6f1bbf06c04b9c29fc478931adf860))

# [1.12.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.11.1...v1.12.0) (2024-08-14)


### Features

* **$stateIdb:** $idb.clear() method now supports dropping the entire database ([d7b8b86](https://github.com/MomsFriendlyDevCo/Vitel/commit/d7b8b8660d633358952cfbcc2aff536c2d817cfa))

## [1.11.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.11.0...v1.11.1) (2024-08-12)


### Bug Fixes

* **$supabase:** Tell Supabase not to throw 406s when we are optionally expecting rows ([9410b5d](https://github.com/MomsFriendlyDevCo/Vitel/commit/9410b5d1ed73011f4b88415750f3d5f4c74b3d5f))

# [1.11.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.10.2...v1.11.0) (2024-08-12)


### Bug Fixes

* **$logRocket:** Typo ([cf74d42](https://github.com/MomsFriendlyDevCo/Vitel/commit/cf74d4255e9e6a53e6121e623bf5575c586d2ff8))


### Features

* **$logRocket:** LogRocket service ([b2d2be3](https://github.com/MomsFriendlyDevCo/Vitel/commit/b2d2be32ddbb3698dfab3d081609e93a5198f1ec))
* Expose utilities scripts via import alias ([898098c](https://github.com/MomsFriendlyDevCo/Vitel/commit/898098c5283a57764b7d4e57ca04ca97426f041a))
* utils/retry ([f2fe919](https://github.com/MomsFriendlyDevCo/Vitel/commit/f2fe919d00cc1e1d02f7a9a598aa082fd1435211))

## [1.10.2](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.10.1...v1.10.2) (2024-08-09)


### Bug Fixes

* Typo ([051da37](https://github.com/MomsFriendlyDevCo/Vitel/commit/051da3712e897d2ce9c2fa3927441867d3589313))

## [1.10.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.10.0...v1.10.1) (2024-08-09)


### Bug Fixes

* **$stateIdb:** More tolerence with "failed successfully" errors ([2954e99](https://github.com/MomsFriendlyDevCo/Vitel/commit/2954e994683928f950c2c5ce4141462ba9461c22))

# [1.10.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.9.0...v1.10.0) (2024-07-31)


### Bug Fixes

* **v-animate:** Typo ([0f3d850](https://github.com/MomsFriendlyDevCo/Vitel/commit/0f3d8500939e4fb1eabf66e59126f9b2c68aad8b))


### Features

* **$stateSupabase:** Uploading files in Supabase now returns the raw Supabase result ([710a929](https://github.com/MomsFriendlyDevCo/Vitel/commit/710a9291c2bd29330275d548f9e70f9cbf7dbbe3))

# [1.9.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.8.0...v1.9.0) (2024-07-30)


### Features

* **v-animate:** v-animate directive for simple animations ([5d67514](https://github.com/MomsFriendlyDevCo/Vitel/commit/5d675144ad2ad9100ce204c7740c1fa7391f7899))

# [1.8.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.7.1...v1.8.0) (2024-07-25)


### Bug Fixes

* **$ripple:** Various debugging artefacts ([ba2c8e2](https://github.com/MomsFriendlyDevCo/Vitel/commit/ba2c8e211770e024bcd0bd387c212ba16dae97a2))
* **$ripple:** Various style inheritence for ripple effect ([b1eb41a](https://github.com/MomsFriendlyDevCo/Vitel/commit/b1eb41ad34ed853e675affcd1ec60dd2528e6662))


### Features

* **$ripple:** Added $ripple UI effect service ([628b31e](https://github.com/MomsFriendlyDevCo/Vitel/commit/628b31e1e6e2f4facdc5f5e1d75900863d024116))

## [1.7.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.7.0...v1.7.1) (2024-07-24)


### Bug Fixes

* **$auth:** Automatically clear login search tokens after auth ([f7f5af2](https://github.com/MomsFriendlyDevCo/Vitel/commit/f7f5af2a7473ffce71505f51ed1885a50e52f841))
* **$authKinde:** Various JSDoc fixes ([832dda4](https://github.com/MomsFriendlyDevCo/Vitel/commit/832dda4a29aa33f13234aea4218066c4be4dbaea))
* **$stateIdb:** Remove debugger marker for weird errors thrown in $idb ([f38a90d](https://github.com/MomsFriendlyDevCo/Vitel/commit/f38a90d681b41587aa9572698b15907720125095))

# [1.7.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.6.0...v1.7.0) (2024-07-12)


### Features

* **$stateIdb:** Added automatic-retry to potencially error prone code blocks ([66b4c09](https://github.com/MomsFriendlyDevCo/Vitel/commit/66b4c0920c4d9d712b6b0487a047df4fb8ae23cb))

# [1.6.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.5.0...v1.6.0) (2024-07-12)


### Features

* **$http:** New support for $http.lazyGet() ([0a3faaf](https://github.com/MomsFriendlyDevCo/Vitel/commit/0a3faafa94a12d5597f50f50d40e082fc2a1c207))

# [1.5.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.4.5...v1.5.0) (2024-07-10)


### Features

* **v-focus:** Now correctly handles Bootstrap modal animations and sets focus after they complete ([4b79556](https://github.com/MomsFriendlyDevCo/Vitel/commit/4b7955646164cde8df7db948d64a8c3e3157411b))

## [1.4.5](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.4.4...v1.4.5) (2024-07-09)


### Bug Fixes

* **$prompt:** Use raw button definitions if we have them rather than only shorthand strings ([50c49d6](https://github.com/MomsFriendlyDevCo/Vitel/commit/50c49d6fe2b676e65edc99a6085350dbfffbe3d8))

## [1.4.4](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.4.3...v1.4.4) (2024-07-02)


### Bug Fixes

* **$idb:** Serialize via lodash.cloneDeep() by default to break apart weird objects ([6459b3e](https://github.com/MomsFriendlyDevCo/Vitel/commit/6459b3e05991cb8876ed2ea0314972b4e89f4fe3))

## [1.4.3](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.4.2...v1.4.3) (2024-06-11)


### Bug Fixes

* **$authKinde:** Added various sanity checks when trying to signup / logout when using the bypassEmail option ([823490a](https://github.com/MomsFriendlyDevCo/Vitel/commit/823490abad09d0ea9816f89a262b33f50da41aaf))

## [1.4.2](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.4.1...v1.4.2) (2024-06-08)


### Bug Fixes

* Better detection for "empty" file meta information to skip the meta update process ([d512f1a](https://github.com/MomsFriendlyDevCo/Vitel/commit/d512f1aa49f3a4a16bb1e7486a24508cbf31ac09))
* Dont crash out when trying to parse file paths that dont have an apparent file ext ([df2c46b](https://github.com/MomsFriendlyDevCo/Vitel/commit/df2c46bbbb4bdda8e7adb95c1b998b540fbb0a8b))

## [1.4.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.4.0...v1.4.1) (2024-06-08)

# [1.4.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.3.1...v1.4.0) (2024-06-08)


### Bug Fixes

* **$stateIdb:** Typo ([99f9599](https://github.com/MomsFriendlyDevCo/Vitel/commit/99f9599a65761e2a8439254368eef0d08141da5f))


### Features

* **$prompt:** Added ability to hide the close button + disable closability alltogether ([27bb44b](https://github.com/MomsFriendlyDevCo/Vitel/commit/27bb44bea8109135a119932b65804d8ac86a0641))

## [1.3.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.3.0...v1.3.1) (2024-05-28)

# [1.3.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.2.2...v1.3.0) (2024-05-24)


### Bug Fixes

* **$stateSupabase:** Bind debug chattyness of @mfdc/supabase-reactive to $stateSupabase ([3b4998a](https://github.com/MomsFriendlyDevCo/Vitel/commit/3b4998ac7def95f46f660d20864dea6499209c3e))


### Features

* **$stateIdb:** Can now disable dynamic entity creation ([c7ab968](https://github.com/MomsFriendlyDevCo/Vitel/commit/c7ab968b33ce77c57df3e287ff63c92426ea7acf))
* **$stateIdb:** Can now specify default entities to create during boot ([57eb0c7](https://github.com/MomsFriendlyDevCo/Vitel/commit/57eb0c75af2188850f1989c0238692ba30a6e2c9))

## [1.2.2](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.2.1...v1.2.2) (2024-05-20)


### Bug Fixes

* **supabase:** Undo workaround for Supabase transport - now working correctly ([a2b367a](https://github.com/MomsFriendlyDevCo/Vitel/commit/a2b367a02838367f074df424c902328029650ee5))

## [1.2.1](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.2.0...v1.2.1) (2024-05-14)


### Bug Fixes

* **$stateIdb:** Experimental close+rebuild functionality + retry-on-fail for DB connections ([4822d1b](https://github.com/MomsFriendlyDevCo/Vitel/commit/4822d1bb6cd96426d233cef3cd00a82a6ecce7e5))

# [1.2.0](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.54...v1.2.0) (2024-04-30)


### Bug Fixes

* Let release-it figure out the release increment ([17c26d7](https://github.com/MomsFriendlyDevCo/Vitel/commit/17c26d716ed376a50ed8de35059318bb8fcfe41c))


### Features

* Added v-scrollable ([6af1951](https://github.com/MomsFriendlyDevCo/Vitel/commit/6af19516af5700aee3985856c9488561d633151b))

## [1.1.54](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.53...v1.1.54) (2024-04-18)

## [1.1.53](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.52...v1.1.53) (2024-04-17)


### Bug Fixes

* **$stateIdb:** Fix for IndexedDB when accessing cache results ([738eaf6](https://github.com/MomsFriendlyDevCo/Vitel/commit/738eaf627df4f397b9f103fdf777f51ad10df1a9))
* Debugging artefacts ([a582503](https://github.com/MomsFriendlyDevCo/Vitel/commit/a58250327f7b8422a2ed3e9f8963cfa8d3236f5e))


### Features

* **$stateIdb:** Added getAll() + clear() functionality ([3010d8e](https://github.com/MomsFriendlyDevCo/Vitel/commit/3010d8e18dcd27382a3889051568ed6a0b54b663))

# [](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.52...v) (2024-04-17)


### Bug Fixes

* **$stateIdb:** Fix for IndexedDB when accessing cache results ([738eaf6](https://github.com/MomsFriendlyDevCo/Vitel/commit/738eaf627df4f397b9f103fdf777f51ad10df1a9))
* Debugging artefacts ([a582503](https://github.com/MomsFriendlyDevCo/Vitel/commit/a58250327f7b8422a2ed3e9f8963cfa8d3236f5e))


### Features

* **$stateIdb:** Added getAll() + clear() functionality ([3010d8e](https://github.com/MomsFriendlyDevCo/Vitel/commit/3010d8e18dcd27382a3889051568ed6a0b54b663))



## [1.1.52](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.51...v1.1.52) (2024-04-15)


### Bug Fixes

* Dont return a weird array(undef) when saving files ([885cefe](https://github.com/MomsFriendlyDevCo/Vitel/commit/885cefece8079fb8076f77d9f46d4cb48b7d155f))


### Features

* **$stateIdb:** Added IndexedDB service ([5211348](https://github.com/MomsFriendlyDevCo/Vitel/commit/5211348a4981c919ba9b2bd5d7b9018e0c088d68))



## [1.1.51](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.50...v1.1.51) (2024-04-09)


### Bug Fixes

* Doubling up object keys ([6fa7ffc](https://github.com/MomsFriendlyDevCo/Vitel/commit/6fa7ffce02017665ed0460b82f970e543c3e620e))


### Features

* **v-focus:** Added hyper-agressive focus getter v-focus ([e0df821](https://github.com/MomsFriendlyDevCo/Vitel/commit/e0df821412b83554e563fe2c67f0c23073527a87))



## [1.1.50](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.49...v1.1.50) (2024-04-02)



## [1.1.49](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.48...v1.1.49) (2024-03-28)


### Bug Fixes

* **$authKinde:** Extra checks before trying to fetch a user that doesnt have a auth token ([21b4bac](https://github.com/MomsFriendlyDevCo/Vitel/commit/21b4bac59aee5c2e34e0fade46ce3467310a2a84))



## [1.1.48](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.47...v1.1.48) (2024-03-21)


### Bug Fixes

* MSW should STFU about unknown endpoints ([39f53c7](https://github.com/MomsFriendlyDevCo/Vitel/commit/39f53c7db56698e5e45727b73412090994cb2cd9))


### Features

* **v-menu:** New v-menu directive to easily handle popup-menus or context-menus ([9cae06d](https://github.com/MomsFriendlyDevCo/Vitel/commit/9cae06d137b05601862cbabc387069226eec818a))



## [1.1.47](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.46...v1.1.47) (2024-03-19)


### Bug Fixes

* **$stateSupabase:** fileUpload() Can now also accept FileList inputs ([8d770d7](https://github.com/MomsFriendlyDevCo/Vitel/commit/8d770d72e259a03a3645023b60604f545880b5c0))


### Features

* <file-drop/> component ([94af6f3](https://github.com/MomsFriendlyDevCo/Vitel/commit/94af6f3e231e16730df1f5a2435d6820bf36f1c8))



## [1.1.46](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.45...v1.1.46) (2024-03-14)


### Bug Fixes

* **<dynamic>:** Incorrect remapping of events -> onEventName ([b2a9d0a](https://github.com/MomsFriendlyDevCo/Vitel/commit/b2a9d0aad1284efeb55a755d7fee6e28b2b3f1ef))
* Dont package favicons in NPM ([1944c93](https://github.com/MomsFriendlyDevCo/Vitel/commit/1944c9342f8a8635ac299cf0e3b836b6365a037e))


### Features

* **$stateSupabase:** Added CacheControl option when uploading ([6e2182a](https://github.com/MomsFriendlyDevCo/Vitel/commit/6e2182abcc37896369462e1cacc9426463c26bfa))
* **v-href:** Can now completely replace the v-href handler ([f1cccbe](https://github.com/MomsFriendlyDevCo/Vitel/commit/f1cccbe54d5f06b3fc2e0f1c979004d8fe61314c))



## [1.1.45](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.44...v1.1.45) (2024-02-29)


### Bug Fixes

* **$stateSupabase:** Fix using raw Blobs in fileUpload() ([72da192](https://github.com/MomsFriendlyDevCo/Vitel/commit/72da1929f0d56a3a1d091a7ff6c8d9e877940fed))


### Features

* **$stateSupabase:** Can now opt out of transcoders when using fileUpload() ([e257458](https://github.com/MomsFriendlyDevCo/Vitel/commit/e2574582f0c70515197a44ccec4a32f982e862f1))



## [1.1.44](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.43...v1.1.44) (2024-02-23)


### Features

* **$authKinde:** onRefresh() hook ([c0afc68](https://github.com/MomsFriendlyDevCo/Vitel/commit/c0afc68c4a0a313ca771fa3076d45bdeed3b2406))



## [1.1.43](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.42...v1.1.43) (2024-02-22)


### Features

* **$authKinde:** Add override to force localstorage if needed ([08e9fa8](https://github.com/MomsFriendlyDevCo/Vitel/commit/08e9fa85a8c147228bb2684edf536116cbfb9ac9))



## [1.1.42](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.41...v1.1.42) (2024-02-21)



## [1.1.41](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.40...v1.1.41) (2024-02-18)


### Features

* **$authKinde:** Allow user decoration via callback ([08c99ae](https://github.com/MomsFriendlyDevCo/Vitel/commit/08c99ae802d76fc246aa4a57c0f5f3f6bbb89620))



## [1.1.40](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.39...v1.1.40) (2024-02-04)


### Bug Fixes

* **menu:** Wrong DOM element referal when setting icons for menus ([7e2614a](https://github.com/MomsFriendlyDevCo/Vitel/commit/7e2614a6ecf82be464300d327f9bd60236d979a6))
* **v-href:** Be more tolerent of data munging before the DOM is ready ([6b08d51](https://github.com/MomsFriendlyDevCo/Vitel/commit/6b08d5162fd961a111d2ebeebb670cc743759d03))



## [1.1.39](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.38...v1.1.39) (2024-01-24)


### Bug Fixes

* **<scrollytelling>:** Better handling of auto-playback + requestAnimationFrame() hooks ([c76510d](https://github.com/MomsFriendlyDevCo/Vitel/commit/c76510dc333b3da9080ef5ac1b9929a0cc870d87))
* Be less picky about node version when compiling ([d2c4a1a](https://github.com/MomsFriendlyDevCo/Vitel/commit/d2c4a1a86f61a549fe244fb58018a4c0722d52f9))
* Less fussy error reporting with `new Position()` ([1c183e0](https://github.com/MomsFriendlyDevCo/Vitel/commit/1c183e03044aa198073301dae6376f819815ffb1))
* Patch @momsfriendlydevco/supabase-reactive to be less picky with NPM engine version spec ([caac525](https://github.com/MomsFriendlyDevCo/Vitel/commit/caac525b6f730c3daf408ed1c0284eb6cbff3546))


### Features

* **<scrollytelling-video/>:** Allow smoother seek between keyframes ([a880396](https://github.com/MomsFriendlyDevCo/Vitel/commit/a880396d1b459061db314bcbefe58a32dde09095))
* **<scrollytelling>:** Better control of position via setPosition() ([8fbe2b1](https://github.com/MomsFriendlyDevCo/Vitel/commit/8fbe2b1758a45be8ea6d3cf63b59337db19afaee))
* **<scrollytelling>:** Moved position handling into its own class instance ([89552b8](https://github.com/MomsFriendlyDevCo/Vitel/commit/89552b8d288b7a5ee278d0cdfef5dc04309138dd))
* **menu:** $menu service to handle one-off / context Boostrap menus ([60fddfe](https://github.com/MomsFriendlyDevCo/Vitel/commit/60fddfe21b5fd6039d5674db2dc138c6f8e575dc))
* **scrollytelling:** Added :startAt property to help with debugging ([3812bac](https://github.com/MomsFriendlyDevCo/Vitel/commit/3812bac25691d7675f699f0ad28eacc196a1f3ac))
* **scrollytelling:** Added basic timeline indicator control ([8d261f2](https://github.com/MomsFriendlyDevCo/Vitel/commit/8d261f287f3d15a3f96e7d8dec52a4bde15c778b))
* **scrollytelling:** Basic PoC ([14077b5](https://github.com/MomsFriendlyDevCo/Vitel/commit/14077b53824cd663dec3001f6d8080e24afa13ac))
* **scrollytelling:** Basic PoC working with video ([a493791](https://github.com/MomsFriendlyDevCo/Vitel/commit/a4937914a410bae8dc1cd97026d02bfd975d36ae))
* **scrollytelling:** Basic video scrollytelling item ([c926aee](https://github.com/MomsFriendlyDevCo/Vitel/commit/c926aee43a6a525924bfadeca8f84972b6ab3dcd))
* **scrollytelling:** Various cleanups for position calculations ([441d2d4](https://github.com/MomsFriendlyDevCo/Vitel/commit/441d2d438a949578e90be44f47a072c69e8bae07))



## [1.1.38](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.37...v1.1.38) (2023-11-28)


### Bug Fixes

* **<v-table/>:** Remove jQuery dependency when correcting table height ([6286770](https://github.com/MomsFriendlyDevCo/Vitel/commit/62867707d8801c99275d10ab437b49f9027ef521))



## [1.1.37](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.36...v1.1.37) (2023-11-28)


### Bug Fixes

* **<v-table/>:** Remove dependency on Vue@2 $setPath + app.service("$http") -> vm.$http ([967724b](https://github.com/MomsFriendlyDevCo/Vitel/commit/967724b88ceab72c400ddf8bb4fa5498109c5790))



## [1.1.36](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.35...v1.1.36) (2023-11-25)


### Features

* v-autocomplete ([146192c](https://github.com/MomsFriendlyDevCo/Vitel/commit/146192c598c987b37249a20c7d8c2e7c749339ba))



## [1.1.35](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.34...v1.1.35) (2023-11-23)



## [1.1.34](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.33...v1.1.34) (2023-11-16)


### Bug Fixes

* Wrong offsets when converting simple strings to UUIDs ([3bb6c7e](https://github.com/MomsFriendlyDevCo/Vitel/commit/3bb6c7e17648412963b0a30ea7e9fec788c913b2))



## [1.1.33](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.32...v1.1.33) (2023-11-16)


### Bug Fixes

* **$stateSupabase:** More consistant throttle settings ([fa8e971](https://github.com/MomsFriendlyDevCo/Vitel/commit/fa8e971d80c3e2b76f248e677c9c1df3319a2a71))



## [1.1.32](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.31...v1.1.32) (2023-11-09)


### Features

* **$stateSupabase:** Added _String2UUID() utility function to mash data into UUIDs ([00599e1](https://github.com/MomsFriendlyDevCo/Vitel/commit/00599e11ff4100dc44ed63db901af295061f4ba0))



## [1.1.31](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.30...v1.1.31) (2023-11-09)


### Bug Fixes

* **v-table:** Typo ([8fef30a](https://github.com/MomsFriendlyDevCo/Vitel/commit/8fef30a9e2db170672538cf031fcc62020458347))



## [1.1.30](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.29...v1.1.30) (2023-11-09)


### Bug Fixes

* **$stateSupabase:** Added "path" output to File data structure ([b191562](https://github.com/MomsFriendlyDevCo/Vitel/commit/b191562a569e002de7585cd1e9f3a2eecaa9ee97))



## [1.1.29](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.28...v1.1.29) (2023-11-08)


### Bug Fixes

* **v-table:** Better support if a column spec lacks a suitable ID ([b0cb704](https://github.com/MomsFriendlyDevCo/Vitel/commit/b0cb7043c47aba6d65ecd63dce9d6446f6583178))
* **v-table:** Better support to calculate endpoint URLs from a baseUrl ([c22a91f](https://github.com/MomsFriendlyDevCo/Vitel/commit/c22a91fec37611e73e92e731262a4a8fa8bb2a00))



## [1.1.28](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.27...v1.1.28) (2023-11-02)


### Bug Fixes

* **$stateSupabase:** Include $ready promise immediately on load ([55fe769](https://github.com/MomsFriendlyDevCo/Vitel/commit/55fe769e8577e6875c268be7332330e76939e40f))


### Features

* **$stateSupabase:** Syncing IDs when binding data now available as an option ([b1c5a42](https://github.com/MomsFriendlyDevCo/Vitel/commit/b1c5a42611e96afcff9eef7c64dff4c746b47975))



## [1.1.27](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.26...v1.1.27) (2023-11-01)


### Bug Fixes

* **$stateSupabase:** binding callbacks onRemoteChange() + onPostInit() are now waited on and are executed in a logical order ([e93289b](https://github.com/MomsFriendlyDevCo/Vitel/commit/e93289b7193f9e7d86a6d37f291b2ff1e6ee888a))
* **$stateSupabase:** Disabled non-functional unsubscribe code and added a debugging marker in place rather than throwing on project change ([768b028](https://github.com/MomsFriendlyDevCo/Vitel/commit/768b02876ef92408ab7c21127444f4b6eefcbb60))



## [1.1.26](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.25...v1.1.26) (2023-10-27)



## [1.1.25](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.24...v1.1.25) (2023-10-26)


### Bug Fixes

* **$stateSupabase:** Fixes to how Supabase syncs objects + avoid needless local updates ([ffeacef](https://github.com/MomsFriendlyDevCo/Vitel/commit/ffeacef7728f8e5c756805e67e3987284fd2a5cf))



## [1.1.24](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.23...v1.1.24) (2023-10-23)


### Features

* **<dump/>:** Dump component now supports JSON highlighting ([8f99c85](https://github.com/MomsFriendlyDevCo/Vitel/commit/8f99c8522f3e877509b66654b2bcfeceba4cddeb))



## [1.1.23](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.22...v1.1.23) (2023-10-19)



## [1.1.22](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.21...v1.1.22) (2023-10-19)


### Bug Fixes

* **$stateSupabase:** Actually wait for file uploasd to succeed before fulfiling promise ([ea5bfbc](https://github.com/MomsFriendlyDevCo/Vitel/commit/ea5bfbc083175bb70b7716b4b9837071c047aeee))
* Dont stomp on promise resolution if closing an already closing modal window ([38063e8](https://github.com/MomsFriendlyDevCo/Vitel/commit/38063e8860f4eae6639e2f78cca6d7d807be871b))


### Features

* **$stateSupabase:** Allow overwriting uploaded files ([5ad035e](https://github.com/MomsFriendlyDevCo/Vitel/commit/5ad035eaf157f455b2fb3ab67c861e4c761c9bce))



## [1.1.21](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.20...v1.1.21) (2023-10-19)


### Bug Fixes

* **$stateSupabase:** Various fixes to the Supabase handling of POJO files ([25a6edc](https://github.com/MomsFriendlyDevCo/Vitel/commit/25a6edcf705d8eeed0b4f1c301d190bf9b1b9e8d))



## [1.1.20](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.19...v1.1.20) (2023-10-18)


### Bug Fixes

* **$authKinde:** Client creation API doesnt always return a promisable ([4146430](https://github.com/MomsFriendlyDevCo/Vitel/commit/414643018c94287e886f3b60efb500718370d6ac))
* Handle created() promise chains from extendables ([c9951dc](https://github.com/MomsFriendlyDevCo/Vitel/commit/c9951dc7366856d8f624c7c7dd6fc1a080b3cf81))
* Resolution issues with optional vs base dependencies ([faf13ba](https://github.com/MomsFriendlyDevCo/Vitel/commit/faf13ba6827345cda79b3e64fbd75161ce03f9e3))
* Wrong Kinde domain suffix ([ae2cbd4](https://github.com/MomsFriendlyDevCo/Vitel/commit/ae2cbd4f3411d4f168dd124e454c2b990ed2eaba))


### Features

* **$prompt:** Can now add optional classes to the modal + outer modalDialog ([e10eea9](https://github.com/MomsFriendlyDevCo/Vitel/commit/e10eea9403fed2fb1a83491c5c302a3e70c22c05))



## [1.1.19](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.18...v1.1.19) (2023-10-17)


### Features

* **$auth-kinde:** Added kinde.io auth handler ([5ce537c](https://github.com/MomsFriendlyDevCo/Vitel/commit/5ce537cc2df19cc76563807accf9cb526ae11648))



## [1.1.18](https://github.com/MomsFriendlyDevCo/Vitel/compare/v1.1.17...v1.1.18) (2023-10-17)


### Bug Fixes

* Debugging artefacts ([81d7c25](https://github.com/MomsFriendlyDevCo/Vitel/commit/81d7c25bb589b9cc68cc701f18564d649df671f5))



## [1.1.17](https://github.com/MomsFriendlyDevCo/Vitel/compare/8eabc54214d520a890c56ab09da06ab4e7a60b67...v1.1.17) (2023-10-14)


### Bug Fixes

* **<dynamic/>:** Dynamic loader can now work on component prototypes alone ([8008514](https://github.com/MomsFriendlyDevCo/Vitel/commit/800851465f1596168b64c74d599976d70750b1da))
* **$http:** Various fixes to $http module ([f008774](https://github.com/MomsFriendlyDevCo/Vitel/commit/f008774d93cdf4e2d31690e46d93329f5ccb2821))
* **$prompt:** Misc fixes for $prompt service to handle [@change](https://github.com/change) emitters + promise returns ([32087ea](https://github.com/MomsFriendlyDevCo/Vitel/commit/32087ea43a31564b08917be284d4b2f7a1e74895))
* **$prompt:** Nicer dependency reporting if Bootstrap / Modal submodule is not installed ([548f7c1](https://github.com/MomsFriendlyDevCo/Vitel/commit/548f7c108af90e2d6fa3b6080c443e639815f482))
* $service.require() + $service.services reactive fixes ([f82cf8f](https://github.com/MomsFriendlyDevCo/Vitel/commit/f82cf8fbe246f78c3cb813f579daab373a2b0ac7))
* **$stateSupabase:** Fix for Websocket / CORS transport in @Supabase/Realtime ([7e3f43c](https://github.com/MomsFriendlyDevCo/Vitel/commit/7e3f43cb7a82a6e76dd9d8e4d30925b7f801e5b3))
* **$stateSupabase:** Misc doc fixes + fileSet() ([ce8f600](https://github.com/MomsFriendlyDevCo/Vitel/commit/ce8f60084bae0a0741f67e1c9767c7347174e508))
* **$stateSupabase:** Nicer wrapper when requesting an empty file list ([296554e](https://github.com/MomsFriendlyDevCo/Vitel/commit/296554e9b86ae0ccd09527169b638578cf1c9c97))
* **$toast:** Better handling when trying to close still-animating-in toasts ([a190ae5](https://github.com/MomsFriendlyDevCo/Vitel/commit/a190ae53b751ce8302858ab5c04387467c481287))
* **$toast:** Dont always assume the dev is updating `toast.progress` ([1285c7e](https://github.com/MomsFriendlyDevCo/Vitel/commit/1285c7e64ad8f7e5e1cab4583d11ce75c1dc2c31))
* Better wrapping for async created() lifecycle hooks of services ([1e5895c](https://github.com/MomsFriendlyDevCo/Vitel/commit/1e5895c0d831a74187a4a1a5b335f2319c1f6c2e))
* Bug with toast closing - promise wrapped toasts using the wrong contents ([132bb8f](https://github.com/MomsFriendlyDevCo/Vitel/commit/132bb8f24390e00414b1590212f5677158005e66))
* Bump NPM:[@supabase](https://github.com/supabase) to latest ([6a973ff](https://github.com/MomsFriendlyDevCo/Vitel/commit/6a973ff949059dd6678ff6e2892589a0212b5c2f))
* Dont display the full date as a tooltip if its the same as whats displayed anyway ([7549c90](https://github.com/MomsFriendlyDevCo/Vitel/commit/7549c909a20c1648d632e69eb96a0180234da82b))
* Dont need utils to work around vue defaults - {required} + {defaults} are flatly incompatible in Vue components ([7d973cd](https://github.com/MomsFriendlyDevCo/Vitel/commit/7d973cd622ed565d1028ed6a4d53caa8fbd6a566))
* Fixes to <v-table/> to patch in proper use of $loader + $http ([ca415da](https://github.com/MomsFriendlyDevCo/Vitel/commit/ca415da6476a573a424aabc628012fedf461485d))
* Force upgrade of sub-dependency for [@supabase](https://github.com/supabase)* to fix issue with node-fetch ([773a497](https://github.com/MomsFriendlyDevCo/Vitel/commit/773a49760432ddc42dae375ca187187f108661cf))
* Gotta love YAML ([b90924c](https://github.com/MomsFriendlyDevCo/Vitel/commit/b90924cb48401a245035cfe3a3cd1a4efda26b65))
* Minor fixes ([32ab7a5](https://github.com/MomsFriendlyDevCo/Vitel/commit/32ab7a5793f1ac1da942558f73b57ff26999cc75))
* Misc fixes to keep ESlint happy ([399fa0b](https://github.com/MomsFriendlyDevCo/Vitel/commit/399fa0bbaf7c8ad4d5602340b79c68dab36f0de7))
* Misc minor bugs and annoyances ([46f478f](https://github.com/MomsFriendlyDevCo/Vitel/commit/46f478f3b3b4c0fed8fa9443c1e33fb51b601d6d))
* Missing package dep ([8a33d40](https://github.com/MomsFriendlyDevCo/Vitel/commit/8a33d400f1a993b0e152d76d9e6fc5d9aeda05f9))
* More fixes for $services global property setting ([0ebf077](https://github.com/MomsFriendlyDevCo/Vitel/commit/0ebf077e7f3e0b1aed5d528a7ce20d83d433971e))
* Moved <dump/> component into general components rather than its own category ([d37fb37](https://github.com/MomsFriendlyDevCo/Vitel/commit/d37fb3744988b042e9e33e98849b31942aeb84aa))
* Prevent irritating "Whats New" popup in Storybook ([730af69](https://github.com/MomsFriendlyDevCo/Vitel/commit/730af69feeee58281ea023a40bd4ae3b2e8cf750))
* Rebuild package-lock.json ([f6e04f6](https://github.com/MomsFriendlyDevCo/Vitel/commit/f6e04f6198fe84a6ceb870cf6742df6ff9fc2373))
* Service sharing (via globalProperties) finally working ([04f4c1f](https://github.com/MomsFriendlyDevCo/Vitel/commit/04f4c1f8c3b4edfa5a99b543a1044d8b10aa2faa))
* Using default signature for property values rather than "this" ([f998771](https://github.com/MomsFriendlyDevCo/Vitel/commit/f99877128579608b205125b5e63e42d23d956bdb))
* **v-href:** Debugging artefacts ([fc812f9](https://github.com/MomsFriendlyDevCo/Vitel/commit/fc812f9693f03764e4bd94ff31dca834971a2b6c))
* **v-href:** Determine which router to use while avoiding globals ([cd6d400](https://github.com/MomsFriendlyDevCo/Vitel/commit/cd6d4000b4eedb19fec05af837aefa6541e9f9e5))
* **v-table:** Use $http baseUrl rather than window location for relative URL ([43c32a5](https://github.com/MomsFriendlyDevCo/Vitel/commit/43c32a5fba1ec023bdbdabdc0bc765e849e5f5b4))
* Validating vtBody before use ([a5f9034](https://github.com/MomsFriendlyDevCo/Vitel/commit/a5f9034c6fd1b7272fbe0ab25a1540cc39e468f2))
* Wait on $SERVICE.promise() if the promise is not already running ([6fdcf53](https://github.com/MomsFriendlyDevCo/Vitel/commit/6fdcf534bc65914146a22a056216224728426fdb))
* Wrong exporter paths for Vue components ([496fd4b](https://github.com/MomsFriendlyDevCo/Vitel/commit/496fd4b895100664b2b7718d2bedf48f03e15f8c))


### Features

* <date/> ([db57803](https://github.com/MomsFriendlyDevCo/Vitel/commit/db578037b48d5cb3bca835c9c26253b0e7fbe5f8))
* **<digest/>:** Added <digest/> ([8ae9831](https://github.com/MomsFriendlyDevCo/Vitel/commit/8ae9831be9c27f499d72a38501d876bfb3a0f079))
* <dynamic/> ([41cdf7f](https://github.com/MomsFriendlyDevCo/Vitel/commit/41cdf7fcfd1c19239d2cc73599c128803861fa2b))
* <file-size/> ([8985bcf](https://github.com/MomsFriendlyDevCo/Vitel/commit/8985bcfcef6e67f7ad4a32089c899f991b8a800f))
* <pagination/> ([c3e7ded](https://github.com/MomsFriendlyDevCo/Vitel/commit/c3e7ded3346d703908409541e96d341b9d1b4ac9))
* <placeholder/> ([b08a304](https://github.com/MomsFriendlyDevCo/Vitel/commit/b08a304ef639b3a23fd38b01db9afdc9f0f96a6a))
* |pluralize ([4895081](https://github.com/MomsFriendlyDevCo/Vitel/commit/4895081b1fb7ab563573cd74142586f85241d734))
* |startCase ([af16625](https://github.com/MomsFriendlyDevCo/Vitel/commit/af166252c947b3c5f08c24d62a8751c667532187))
* $events ([3ab4bd7](https://github.com/MomsFriendlyDevCo/Vitel/commit/3ab4bd7f49bbff8697c4a761207d682612845175))
* $http ([9dc16a8](https://github.com/MomsFriendlyDevCo/Vitel/commit/9dc16a843398fa9639d579e30390f0c9015ce404))
* $http.throttle() ([dfd8cb6](https://github.com/MomsFriendlyDevCo/Vitel/commit/dfd8cb6317d67deee87c274a928f9a263191159a))
* **$http:** Can now specify base URL for $http ([f18a96e](https://github.com/MomsFriendlyDevCo/Vitel/commit/f18a96e81be442515e295ae72f6d2fb1c6c2561c))
* $loader.start(id:String) -> $loader.start({id: String, caption: String}) ([0b89ab7](https://github.com/MomsFriendlyDevCo/Vitel/commit/0b89ab7ad47541d5cc8bac2f02f5a24014a9ba43))
* $prompt now supports component embedding ([b80d58e](https://github.com/MomsFriendlyDevCo/Vitel/commit/b80d58e6ffe56021e49f5fa88eac35ff455fb6a3))
* **$prompt:** $prompt.isOpen + $prompt.closeIfOpen() ([9656367](https://github.com/MomsFriendlyDevCo/Vitel/commit/96563676d45b16cf6b9af1a8c4d5cb165cbdace8))
* $service{timeout:Number} to catch deadlocks when loading services ([3843715](https://github.com/MomsFriendlyDevCo/Vitel/commit/384371594bb1c87f4616131d06c980d8c69e2cae))
* $stateSupabase ([904c7d9](https://github.com/MomsFriendlyDevCo/Vitel/commit/904c7d9e01a67d90922a19f60e8961acce353667))
* **$stateSupabase:** Allow reaction to remote data changes with bindData({onRemoteChange:Function}) ([04ec052](https://github.com/MomsFriendlyDevCo/Vitel/commit/04ec052abc1a0d646e4721d24f8335318809e44e))
* **$stateSupabase:** Throw if basic config is missing when starting Supabase connection ([e49d17a](https://github.com/MomsFriendlyDevCo/Vitel/commit/e49d17ab0317eb1f301e75d9ea917d5aff4e554d))
* $toast.catch() ([e2dae26](https://github.com/MomsFriendlyDevCo/Vitel/commit/e2dae2625741999d7f946f20391703843e3bd834))
* Added $stateSupabase.fileGet({toast:Boolean}) functionality ([08707bb](https://github.com/MomsFriendlyDevCo/Vitel/commit/08707bb339a4e383d9998f7f4be33b3de3fd0930))
* Added basic debugging + stack closing functionality to $prompt ([68fc52b](https://github.com/MomsFriendlyDevCo/Vitel/commit/68fc52b15116001395ae3b1022ce2f0bd6bed91e))
* Added fake-user output to $http demo ([0fba479](https://github.com/MomsFriendlyDevCo/Vitel/commit/0fba479633ee09fda9ce72b729c6e0702ad15a77))
* Added geneic debug mode for services ([e6cc37e](https://github.com/MomsFriendlyDevCo/Vitel/commit/e6cc37e3036884c29a10afdbc917c5379485d63e))
* Added List filter ([4033875](https://github.com/MomsFriendlyDevCo/Vitel/commit/4033875872409dcb2c4a8bd6c19ac7c188673e9e))
* Added Number() filter ([db91c57](https://github.com/MomsFriendlyDevCo/Vitel/commit/db91c5710d88721a46d958413b0b16fe451fb45d))
* Added Service(Name, Spec, {onLoad:Function, onReady:Function}) to make extending service options easier ([990c1e0](https://github.com/MomsFriendlyDevCo/Vitel/commit/990c1e0f7401063277df2f010091f1cb6ff7f889))
* Added support for vm.$filters as a Vue service ([0007bcc](https://github.com/MomsFriendlyDevCo/Vitel/commit/0007bcc6aab13ab921852c3de20ecb46a8695410))
* Allow extending $service{created()} ([21d96dd](https://github.com/MomsFriendlyDevCo/Vitel/commit/21d96ddb07ca4a7524c66614bb8d497092f04f4c))
* Auto import <pagination/> within <v-table/> ([e7ace77](https://github.com/MomsFriendlyDevCo/Vitel/commit/e7ace77dcdd600b9181d7df6466e825707e99e13))
* Basic <v-table/> implementation ([0d98d8a](https://github.com/MomsFriendlyDevCo/Vitel/commit/0d98d8a72078dc3efb6e477210c2e16b44035100))
* Basic $authHanko implementation ([8da70d0](https://github.com/MomsFriendlyDevCo/Vitel/commit/8da70d09d133b66d03e164544b14817031ac9f07))
* Basic $loader implementation ([32ca30a](https://github.com/MomsFriendlyDevCo/Vitel/commit/32ca30a253f4a9eea4e699f90473c7ae948b68c3))
* Basic $toast service ([8686be8](https://github.com/MomsFriendlyDevCo/Vitel/commit/8686be8f21d6549fdb6a377fbbea38402b00ea7c))
* Basic implementation of $prompt ([88fc1ac](https://github.com/MomsFriendlyDevCo/Vitel/commit/88fc1ac719dabcbaa91b82c438b1e3e429aa6148))
* Can now call app.service() / app.filter() to ask for services/filters rather than just defining them ([a683104](https://github.com/MomsFriendlyDevCo/Vitel/commit/a683104c31943e3314da330475b205cdd431cb10))
* Can now set {forceDebug:true} when loading the main Vitel worker to force debugging on everything ([fbb78c1](https://github.com/MomsFriendlyDevCo/Vitel/commit/fbb78c190b8ebb4b80ba224fdb18c2ed83c6a409))
* Can now use $services as singleton functions by exposing a top level `call()` method + $http now also accepts this ([cd14813](https://github.com/MomsFriendlyDevCo/Vitel/commit/cd14813b2a83b6b0c32358e77f2a4ef21d6c46de))
* Currency filter ([ad30ebb](https://github.com/MomsFriendlyDevCo/Vitel/commit/ad30ebb4278647a057ddd24bd1a8ae9dfe77cfc6))
* Date() filter + fixes for original <date/> component ([b4fb4d1](https://github.com/MomsFriendlyDevCo/Vitel/commit/b4fb4d14351c4ec59687a245cf981ce667726821))
* Generic $services handler ([a8be9b8](https://github.com/MomsFriendlyDevCo/Vitel/commit/a8be9b8309a230a44eae4c4f7b247067d1db6651))
* Loading widget ([8eabc54](https://github.com/MomsFriendlyDevCo/Vitel/commit/8eabc54214d520a890c56ab09da06ab4e7a60b67))
* Ported v-href ([778b9d7](https://github.com/MomsFriendlyDevCo/Vitel/commit/778b9d721f8488fbf5f79023ef6a785f54e0dae4))
* **v-href:** Added {before:Function, after:Function} handling to v-href ([af6aa55](https://github.com/MomsFriendlyDevCo/Vitel/commit/af6aa5509058bd60a619f20c89a8b120e9cb8278))
