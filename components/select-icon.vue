<script>
import chainable from '@momsfriendlydevco/chainable';
import Focus from '#directives/v-focus';
import regexpEscape from '#utils/regexpEscape';

/**
* Simple icon select UI via a button
* Requires the $prompt service
*
* @prop [classEmpty='btn btn-light'] Class to use when no icon is actively selected
* @prop [classActive='btn btn-light'] Class to use when an icon is actively selected
* @prop [iconEmpty='fas fa-flag'] Default icon to use when no icon is actively selected
* @prop [showTitle=true] Whether to show a cleaned up icon title for the selected icon
* @prop [value] Existing icon bind value
*
* @emits change Emitted as `(iconClass:String)` on change
*/
export default {
	emits: ['change', 'update:modelValue'],
	directives: [
		Focus,
	],
	data() { return {
		/**
		* The currently selected icon class, if any
		* @type {Null|String}
		*/
		selected: null,


		/**
		* Whether the picker is currently active
		* @type {Boolean}
		*/
		isPicking: false,

		/**
		* The current search string, if any
		* @type {String}
		*/
		search: '',


		/**
		* List of all supported icons
		* @type {Array<String>}
		*/
		icons: [
			// To refresh icons run `./components/select-icon.fetch.js` and paste the content below
			// Extracted icons {{{
			"fa-500px fab","fa-accessible-icon fab","fa-accusoft fab","fa-acquisitions-incorporated fab","fa-ad far","fa-address-book far","fa-address-card far","fa-adjust far","fa-adn fab","fa-adversal fab","fa-affiliatetheme fab","fa-air-freshener far","fa-airbnb fab","fa-algolia fab","fa-align-center far","fa-align-justify far","fa-align-left far","fa-align-right far","fa-alipay fab","fa-allergies far","fa-amazon fab","fa-amazon-pay fab","fa-ambulance far","fa-american-sign-language-interpreting far","fa-amilia fab","fa-anchor far","fa-android fab","fa-angellist fab","fa-angle-double-down far","fa-angle-double-left far","fa-angle-double-right far","fa-angle-double-up far","fa-angle-down far","fa-angle-left far","fa-angle-right far","fa-angle-up far","fa-angry far","fa-angrycreative fab","fa-angular fab","fa-ankh far","fa-app-store fab","fa-app-store-ios fab","fa-apper fab","fa-apple fab","fa-apple-alt far","fa-apple-pay fab","fa-archive far","fa-archway far","fa-arrow-alt-circle-down far","fa-arrow-alt-circle-left far","fa-arrow-alt-circle-right far","fa-arrow-alt-circle-up far","fa-arrow-circle-down far","fa-arrow-circle-left far","fa-arrow-circle-right far","fa-arrow-circle-up far","fa-arrow-down far","fa-arrow-left far","fa-arrow-right far","fa-arrow-up far","fa-arrows-alt far","fa-arrows-alt-h far","fa-arrows-alt-v far","fa-artstation fab","fa-assistive-listening-systems far","fa-asterisk far","fa-asymmetrik fab","fa-at far","fa-atlas far","fa-atlassian fab","fa-atom far","fa-audible fab","fa-audio-description far","fa-autoprefixer fab","fa-avianex fab","fa-aviato fab","fa-award far","fa-aws fab","fa-baby far","fa-baby-carriage far","fa-backspace far","fa-backward far","fa-bacon far","fa-bacteria far","fa-bacterium far","fa-bahai far","fa-balance-scale far","fa-balance-scale-left far","fa-balance-scale-right far","fa-ban far","fa-band-aid far","fa-bandcamp fab","fa-barcode far","fa-bars far","fa-baseball-ball far","fa-basketball-ball far","fa-bath far","fa-battery-empty far","fa-battery-full far","fa-battery-half far","fa-battery-quarter far","fa-battery-three-quarters far","fa-battle-net fab","fa-bed far","fa-beer far","fa-behance fab","fa-behance-square fab","fa-bell far","fa-bell-slash far","fa-bezier-curve far","fa-bible far","fa-bicycle far","fa-biking far","fa-bimobject fab","fa-binoculars far","fa-biohazard far","fa-birthday-cake far","fa-bitbucket fab","fa-bitcoin fab","fa-bity fab","fa-black-tie fab","fa-blackberry fab","fa-blender far","fa-blender-phone far","fa-blind far","fa-blog far","fa-blogger fab","fa-blogger-b fab","fa-bluetooth fab","fa-bluetooth-b fab","fa-bold far","fa-bolt far","fa-bomb far","fa-bone far","fa-bong far","fa-book far","fa-book-dead far","fa-book-medical far","fa-book-open far","fa-book-reader far","fa-bookmark far","fa-bootstrap fab","fa-border-all far","fa-border-none far","fa-border-style far","fa-bowling-ball far","fa-box far","fa-box-open far","fa-box-tissue far","fa-boxes far","fa-braille far","fa-brain far","fa-bread-slice far","fa-briefcase far","fa-briefcase-medical far","fa-broadcast-tower far","fa-broom far","fa-brush far","fa-btc fab","fa-buffer fab","fa-bug far","fa-building far","fa-bullhorn far","fa-bullseye far","fa-burn far","fa-buromobelexperte fab","fa-bus far","fa-bus-alt far","fa-business-time far","fa-buy-n-large fab","fa-buysellads fab","fa-calculator far","fa-calendar far","fa-calendar-alt far","fa-calendar-check far","fa-calendar-day far","fa-calendar-minus far","fa-calendar-plus far","fa-calendar-times far","fa-calendar-week far","fa-camera far","fa-camera-retro far","fa-campground far","fa-canadian-maple-leaf fab","fa-candy-cane far","fa-cannabis far","fa-capsules far","fa-car far","fa-car-alt far","fa-car-battery far","fa-car-crash far","fa-car-side far","fa-caravan far","fa-caret-down far","fa-caret-left far","fa-caret-right far","fa-caret-square-down far","fa-caret-square-left far","fa-caret-square-right far","fa-caret-square-up far","fa-caret-up far","fa-carrot far","fa-cart-arrow-down far","fa-cart-plus far","fa-cash-register far","fa-cat far","fa-cc-amazon-pay fab","fa-cc-amex fab","fa-cc-apple-pay fab","fa-cc-diners-club fab","fa-cc-discover fab","fa-cc-jcb fab","fa-cc-mastercard fab","fa-cc-paypal fab","fa-cc-stripe fab","fa-cc-visa fab","fa-centercode fab","fa-centos fab","fa-certificate far","fa-chair far","fa-chalkboard far","fa-chalkboard-teacher far","fa-charging-station far","fa-chart-area far","fa-chart-bar far","fa-chart-line far","fa-chart-pie far","fa-check far","fa-check-circle far","fa-check-double far","fa-check-square far","fa-cheese far","fa-chess far","fa-chess-bishop far","fa-chess-board far","fa-chess-king far","fa-chess-knight far","fa-chess-pawn far","fa-chess-queen far","fa-chess-rook far","fa-chevron-circle-down far","fa-chevron-circle-left far","fa-chevron-circle-right far","fa-chevron-circle-up far","fa-chevron-down far","fa-chevron-left far","fa-chevron-right far","fa-chevron-up far","fa-child far","fa-chrome fab","fa-chromecast fab","fa-church far","fa-circle far","fa-circle-notch far","fa-city far","fa-clinic-medical far","fa-clipboard far","fa-clipboard-check far","fa-clipboard-list far","fa-clock far","fa-clone far","fa-closed-captioning far","fa-cloud far","fa-cloud-download-alt far","fa-cloud-meatball far","fa-cloud-moon far","fa-cloud-moon-rain far","fa-cloud-rain far","fa-cloud-showers-heavy far","fa-cloud-sun far","fa-cloud-sun-rain far","fa-cloud-upload-alt far","fa-cloudflare fab","fa-cloudscale fab","fa-cloudsmith fab","fa-cloudversify fab","fa-cocktail far","fa-code far","fa-code-branch far","fa-codepen fab","fa-codiepie fab","fa-coffee far","fa-cog far","fa-cogs far","fa-coins far","fa-columns far","fa-comment far","fa-comment-alt far","fa-comment-dollar far","fa-comment-dots far","fa-comment-medical far","fa-comment-slash far","fa-comments far","fa-comments-dollar far","fa-compact-disc far","fa-compass far","fa-compress far","fa-compress-alt far","fa-compress-arrows-alt far","fa-concierge-bell far","fa-confluence fab","fa-connectdevelop fab","fa-contao fab","fa-cookie far","fa-cookie-bite far","fa-copy far","fa-copyright far","fa-cotton-bureau fab","fa-couch far","fa-cpanel fab","fa-creative-commons fab","fa-creative-commons-by fab","fa-creative-commons-nc fab","fa-creative-commons-nc-eu fab","fa-creative-commons-nc-jp fab","fa-creative-commons-nd fab","fa-creative-commons-pd fab","fa-creative-commons-pd-alt fab","fa-creative-commons-remix fab","fa-creative-commons-sa fab","fa-creative-commons-sampling fab","fa-creative-commons-sampling-plus fab","fa-creative-commons-share fab","fa-creative-commons-zero fab","fa-credit-card far","fa-critical-role fab","fa-crop far","fa-crop-alt far","fa-cross far","fa-crosshairs far","fa-crow far","fa-crown far","fa-crutch far","fa-css3 fab","fa-css3-alt fab","fa-cube far","fa-cubes far","fa-cut far","fa-cuttlefish fab","fa-d-and-d fab","fa-d-and-d-beyond fab","fa-dailymotion fab","fa-dashcube fab","fa-database far","fa-deaf far","fa-deezer fab","fa-delicious fab","fa-democrat far","fa-deploydog fab","fa-deskpro fab","fa-desktop far","fa-dev fab","fa-deviantart fab","fa-dharmachakra far","fa-dhl fab","fa-diagnoses far","fa-diaspora fab","fa-dice far","fa-dice-d20 far","fa-dice-d6 far","fa-dice-five far","fa-dice-four far","fa-dice-one far","fa-dice-six far","fa-dice-three far","fa-dice-two far","fa-digg fab","fa-digital-ocean fab","fa-digital-tachograph far","fa-directions far","fa-discord fab","fa-discourse fab","fa-disease far","fa-divide far","fa-dizzy far","fa-dna far","fa-dochub fab","fa-docker fab","fa-dog far","fa-dollar-sign far","fa-dolly far","fa-dolly-flatbed far","fa-donate far","fa-door-closed far","fa-door-open far","fa-dot-circle far","fa-dove far","fa-download far","fa-draft2digital fab","fa-drafting-compass far","fa-dragon far","fa-draw-polygon far","fa-dribbble fab","fa-dribbble-square fab","fa-dropbox fab","fa-drum far","fa-drum-steelpan far","fa-drumstick-bite far","fa-drupal fab","fa-dumbbell far","fa-dumpster far","fa-dumpster-fire far","fa-dungeon far","fa-dyalog fab","fa-earlybirds fab","fa-ebay fab","fa-edge fab","fa-edge-legacy fab","fa-edit far","fa-egg far","fa-eject far","fa-elementor fab","fa-ellipsis-h far","fa-ellipsis-v far","fa-ello fab","fa-ember fab","fa-empire fab","fa-envelope far","fa-envelope-open far","fa-envelope-open-text far","fa-envelope-square far","fa-envira fab","fa-equals far","fa-eraser far","fa-erlang fab","fa-ethereum fab","fa-ethernet far","fa-etsy fab","fa-euro-sign far","fa-evernote fab","fa-exchange-alt far","fa-exclamation far","fa-exclamation-circle far","fa-exclamation-triangle far","fa-expand far","fa-expand-alt far","fa-expand-arrows-alt far","fa-expeditedssl fab","fa-external-link-alt far","fa-external-link-square-alt far","fa-eye far","fa-eye-dropper far","fa-eye-slash far","fa-facebook fab","fa-facebook-f fab","fa-facebook-messenger fab","fa-facebook-square fab","fa-fan far","fa-fantasy-flight-games fab","fa-fast-backward far","fa-fast-forward far","fa-faucet far","fa-fax far","fa-feather far","fa-feather-alt far","fa-fedex fab","fa-fedora fab","fa-female far","fa-fighter-jet far","fa-figma fab","fa-file far","fa-file-alt far","fa-file-archive far","fa-file-audio far","fa-file-code far","fa-file-contract far","fa-file-csv far","fa-file-download far","fa-file-excel far","fa-file-export far","fa-file-image far","fa-file-import far","fa-file-invoice far","fa-file-invoice-dollar far","fa-file-medical far","fa-file-medical-alt far","fa-file-pdf far","fa-file-powerpoint far","fa-file-prescription far","fa-file-signature far","fa-file-upload far","fa-file-video far","fa-file-word far","fa-fill far","fa-fill-drip far","fa-film far","fa-filter far","fa-fingerprint far","fa-fire far","fa-fire-alt far","fa-fire-extinguisher far","fa-firefox fab","fa-firefox-browser fab","fa-first-aid far","fa-first-order fab","fa-first-order-alt fab","fa-firstdraft fab","fa-fish far","fa-fist-raised far","fa-flag far","fa-flag-checkered far","fa-flag-usa far","fa-flask far","fa-flickr fab","fa-flipboard fab","fa-flushed far","fa-fly fab","fa-folder far","fa-folder-minus far","fa-folder-open far","fa-folder-plus far","fa-font far","fa-font-awesome fab","fa-font-awesome-alt fab","fa-font-awesome-flag fab","fa-font-awesome-logo-full fab","fa-fonticons fab","fa-fonticons-fi fab","fa-football-ball far","fa-fort-awesome fab","fa-fort-awesome-alt fab","fa-forumbee fab","fa-forward far","fa-foursquare fab","fa-free-code-camp fab","fa-freebsd fab","fa-frog far","fa-frown far","fa-frown-open far","fa-fulcrum fab","fa-funnel-dollar far","fa-futbol far","fa-galactic-republic fab","fa-galactic-senate fab","fa-gamepad far","fa-gas-pump far","fa-gavel far","fa-gem far","fa-genderless far","fa-get-pocket fab","fa-gg fab","fa-gg-circle fab","fa-ghost far","fa-gift far","fa-gifts far","fa-git fab","fa-git-alt fab","fa-git-square fab","fa-github fab","fa-github-alt fab","fa-github-square fab","fa-gitkraken fab","fa-gitlab fab","fa-gitter fab","fa-glass-cheers far","fa-glass-martini far","fa-glass-martini-alt far","fa-glass-whiskey far","fa-glasses far","fa-glide fab","fa-glide-g fab","fa-globe far","fa-globe-africa far","fa-globe-americas far","fa-globe-asia far","fa-globe-europe far","fa-gofore fab","fa-golf-ball far","fa-goodreads fab","fa-goodreads-g fab","fa-google fab","fa-google-drive fab","fa-google-pay fab","fa-google-play fab","fa-google-plus fab","fa-google-plus-g fab","fa-google-plus-square fab","fa-google-wallet fab","fa-gopuram far","fa-graduation-cap far","fa-gratipay fab","fa-grav fab","fa-greater-than far","fa-greater-than-equal far","fa-grimace far","fa-grin far","fa-grin-alt far","fa-grin-beam far","fa-grin-beam-sweat far","fa-grin-hearts far","fa-grin-squint far","fa-grin-squint-tears far","fa-grin-stars far","fa-grin-tears far","fa-grin-tongue far","fa-grin-tongue-squint far","fa-grin-tongue-wink far","fa-grin-wink far","fa-grip-horizontal far","fa-grip-lines far","fa-grip-lines-vertical far","fa-grip-vertical far","fa-gripfire fab","fa-grunt fab","fa-guilded fab","fa-guitar far","fa-gulp fab","fa-h-square far","fa-hacker-news fab","fa-hacker-news-square fab","fa-hackerrank fab","fa-hamburger far","fa-hammer far","fa-hamsa far","fa-hand-holding far","fa-hand-holding-heart far","fa-hand-holding-medical far","fa-hand-holding-usd far","fa-hand-holding-water far","fa-hand-lizard far","fa-hand-middle-finger far","fa-hand-paper far","fa-hand-peace far","fa-hand-point-down far","fa-hand-point-left far","fa-hand-point-right far","fa-hand-point-up far","fa-hand-pointer far","fa-hand-rock far","fa-hand-scissors far","fa-hand-sparkles far","fa-hand-spock far","fa-hands far","fa-hands-helping far","fa-hands-wash far","fa-handshake far","fa-handshake-alt-slash far","fa-handshake-slash far","fa-hanukiah far","fa-hard-hat far","fa-hashtag far","fa-hat-cowboy far","fa-hat-cowboy-side far","fa-hat-wizard far","fa-hdd far","fa-head-side-cough far","fa-head-side-cough-slash far","fa-head-side-mask far","fa-head-side-virus far","fa-heading far","fa-headphones far","fa-headphones-alt far","fa-headset far","fa-heart far","fa-heart-broken far","fa-heartbeat far","fa-helicopter far","fa-highlighter far","fa-hiking far","fa-hippo far","fa-hips fab","fa-hire-a-helper fab","fa-history far","fa-hive fab","fa-hockey-puck far","fa-holly-berry far","fa-home far","fa-hooli fab","fa-hornbill fab","fa-horse far","fa-horse-head far","fa-hospital far","fa-hospital-alt far","fa-hospital-symbol far","fa-hospital-user far","fa-hot-tub far","fa-hotdog far","fa-hotel far","fa-hotjar fab","fa-hourglass far","fa-hourglass-end far","fa-hourglass-half far","fa-hourglass-start far","fa-house-damage far","fa-house-user far","fa-houzz fab","fa-hryvnia far","fa-html5 fab","fa-hubspot fab","fa-i-cursor far","fa-ice-cream far","fa-icicles far","fa-icons far","fa-id-badge far","fa-id-card far","fa-id-card-alt far","fa-ideal fab","fa-igloo far","fa-image far","fa-images far","fa-imdb fab","fa-inbox far","fa-indent far","fa-industry far","fa-infinity far","fa-info far","fa-info-circle far","fa-innosoft fab","fa-instagram fab","fa-instagram-square fab","fa-instalod fab","fa-intercom fab","fa-internet-explorer fab","fa-invision fab","fa-ioxhost fab","fa-italic far","fa-itch-io fab","fa-itunes fab","fa-itunes-note fab","fa-java fab","fa-jedi far","fa-jedi-order fab","fa-jenkins fab","fa-jira fab","fa-joget fab","fa-joint far","fa-joomla fab","fa-journal-whills far","fa-js fab","fa-js-square fab","fa-jsfiddle fab","fa-kaaba far","fa-kaggle fab","fa-key far","fa-keybase fab","fa-keyboard far","fa-keycdn fab","fa-khanda far","fa-kickstarter fab","fa-kickstarter-k fab","fa-kiss far","fa-kiss-beam far","fa-kiss-wink-heart far","fa-kiwi-bird far","fa-korvue fab","fa-landmark far","fa-language far","fa-laptop far","fa-laptop-code far","fa-laptop-house far","fa-laptop-medical far","fa-laravel fab","fa-lastfm fab","fa-lastfm-square fab","fa-laugh far","fa-laugh-beam far","fa-laugh-squint far","fa-laugh-wink far","fa-layer-group far","fa-leaf far","fa-leanpub fab","fa-lemon far","fa-less fab","fa-less-than far","fa-less-than-equal far","fa-level-down-alt far","fa-level-up-alt far","fa-life-ring far","fa-lightbulb far","fa-line fab","fa-link far","fa-linkedin fab","fa-linkedin-in fab","fa-linode fab","fa-linux fab","fa-lira-sign far","fa-list far","fa-list-alt far","fa-list-ol far","fa-list-ul far","fa-location-arrow far","fa-lock far","fa-lock-open far","fa-long-arrow-alt-down far","fa-long-arrow-alt-left far","fa-long-arrow-alt-right far","fa-long-arrow-alt-up far","fa-low-vision far","fa-luggage-cart far","fa-lungs far","fa-lungs-virus far","fa-lyft fab","fa-magento fab","fa-magic far","fa-magnet far","fa-mail-bulk far","fa-mailchimp fab","fa-male far","fa-mandalorian fab","fa-map far","fa-map-marked far","fa-map-marked-alt far","fa-map-marker far","fa-map-marker-alt far","fa-map-pin far","fa-map-signs far","fa-markdown fab","fa-marker far","fa-mars far","fa-mars-double far","fa-mars-stroke far","fa-mars-stroke-h far","fa-mars-stroke-v far","fa-mask far","fa-mastodon fab","fa-maxcdn fab","fa-mdb fab","fa-medal far","fa-medapps fab","fa-medium fab","fa-medium-m fab","fa-medkit far","fa-medrt fab","fa-meetup fab","fa-megaport fab","fa-meh far","fa-meh-blank far","fa-meh-rolling-eyes far","fa-memory far","fa-mendeley fab","fa-menorah far","fa-mercury far","fa-meteor far","fa-microblog fab","fa-microchip far","fa-microphone far","fa-microphone-alt far","fa-microphone-alt-slash far","fa-microphone-slash far","fa-microscope far","fa-microsoft fab","fa-minus far","fa-minus-circle far","fa-minus-square far","fa-mitten far","fa-mix fab","fa-mixcloud fab","fa-mixer fab","fa-mizuni fab","fa-mobile far","fa-mobile-alt far","fa-modx fab","fa-monero fab","fa-money-bill far","fa-money-bill-alt far","fa-money-bill-wave far","fa-money-bill-wave-alt far","fa-money-check far","fa-money-check-alt far","fa-monument far","fa-moon far","fa-mortar-pestle far","fa-mosque far","fa-motorcycle far","fa-mountain far","fa-mouse far","fa-mouse-pointer far","fa-mug-hot far","fa-music far","fa-napster fab","fa-neos fab","fa-network-wired far","fa-neuter far","fa-newspaper far","fa-nimblr fab","fa-node fab","fa-node-js fab","fa-not-equal far","fa-notes-medical far","fa-npm fab","fa-ns8 fab","fa-nutritionix fab","fa-object-group far","fa-object-ungroup far","fa-octopus-deploy fab","fa-odnoklassniki fab","fa-odnoklassniki-square fab","fa-oil-can far","fa-old-republic fab","fa-om far","fa-opencart fab","fa-openid fab","fa-opera fab","fa-optin-monster fab","fa-orcid fab","fa-osi fab","fa-otter far","fa-outdent far","fa-page4 fab","fa-pagelines fab","fa-pager far","fa-paint-brush far","fa-paint-roller far","fa-palette far","fa-palfed fab","fa-pallet far","fa-paper-plane far","fa-paperclip far","fa-parachute-box far","fa-paragraph far","fa-parking far","fa-passport far","fa-pastafarianism far","fa-paste far","fa-patreon fab","fa-pause far","fa-pause-circle far","fa-paw far","fa-paypal fab","fa-peace far","fa-pen far","fa-pen-alt far","fa-pen-fancy far","fa-pen-nib far","fa-pen-square far","fa-pencil-alt far","fa-pencil-ruler far","fa-penny-arcade fab","fa-people-arrows far","fa-people-carry far","fa-pepper-hot far","fa-perbyte fab","fa-percent far","fa-percentage far","fa-periscope fab","fa-person-booth far","fa-phabricator fab","fa-phoenix-framework fab","fa-phoenix-squadron fab","fa-phone far","fa-phone-alt far","fa-phone-slash far","fa-phone-square far","fa-phone-square-alt far","fa-phone-volume far","fa-photo-video far","fa-php fab","fa-pied-piper fab","fa-pied-piper-alt fab","fa-pied-piper-hat fab","fa-pied-piper-pp fab","fa-pied-piper-square fab","fa-piggy-bank far","fa-pills far","fa-pinterest fab","fa-pinterest-p fab","fa-pinterest-square fab","fa-pizza-slice far","fa-place-of-worship far","fa-plane far","fa-plane-arrival far","fa-plane-departure far","fa-plane-slash far","fa-play far","fa-play-circle far","fa-playstation fab","fa-plug far","fa-plus far","fa-plus-circle far","fa-plus-square far","fa-podcast far","fa-poll far","fa-poll-h far","fa-poo far","fa-poo-storm far","fa-poop far","fa-portrait far","fa-pound-sign far","fa-power-off far","fa-pray far","fa-praying-hands far","fa-prescription far","fa-prescription-bottle far","fa-prescription-bottle-alt far","fa-print far","fa-procedures far","fa-product-hunt fab","fa-project-diagram far","fa-pump-medical far","fa-pump-soap far","fa-pushed fab","fa-puzzle-piece far","fa-python fab","fa-qq fab","fa-qrcode far","fa-question far","fa-question-circle far","fa-quidditch far","fa-quinscape fab","fa-quora fab","fa-quote-left far","fa-quote-right far","fa-quran far","fa-r-project fab","fa-radiation far","fa-radiation-alt far","fa-rainbow far","fa-random far","fa-raspberry-pi fab","fa-ravelry fab","fa-react fab","fa-reacteurope fab","fa-readme fab","fa-rebel fab","fa-receipt far","fa-record-vinyl far","fa-recycle far","fa-red-river fab","fa-reddit fab","fa-reddit-alien fab","fa-reddit-square fab","fa-redhat fab","fa-redo far","fa-redo-alt far","fa-registered far","fa-remove-format far","fa-renren fab","fa-reply far","fa-reply-all far","fa-replyd fab","fa-republican far","fa-researchgate fab","fa-resolving fab","fa-restroom far","fa-retweet far","fa-rev fab","fa-ribbon far","fa-ring far","fa-road far","fa-robot far","fa-rocket far","fa-rocketchat fab","fa-rockrms fab","fa-route far","fa-rss far","fa-rss-square far","fa-ruble-sign far","fa-ruler far","fa-ruler-combined far","fa-ruler-horizontal far","fa-ruler-vertical far","fa-running far","fa-rupee-sign far","fa-rust fab","fa-sad-cry far","fa-sad-tear far","fa-safari fab","fa-salesforce fab","fa-sass fab","fa-satellite far","fa-satellite-dish far","fa-save far","fa-schlix fab","fa-school far","fa-screwdriver far","fa-scribd fab","fa-scroll far","fa-sd-card far","fa-search far","fa-search-dollar far","fa-search-location far","fa-search-minus far","fa-search-plus far","fa-searchengin fab","fa-seedling far","fa-sellcast fab","fa-sellsy fab","fa-server far","fa-servicestack fab","fa-shapes far","fa-share far","fa-share-alt far","fa-share-alt-square far","fa-share-square far","fa-shekel-sign far","fa-shield-alt far","fa-shield-virus far","fa-ship far","fa-shipping-fast far","fa-shirtsinbulk fab","fa-shoe-prints far","fa-shopify fab","fa-shopping-bag far","fa-shopping-basket far","fa-shopping-cart far","fa-shopware fab","fa-shower far","fa-shuttle-van far","fa-sign far","fa-sign-in-alt far","fa-sign-language far","fa-sign-out-alt far","fa-signal far","fa-signature far","fa-sim-card far","fa-simplybuilt fab","fa-sink far","fa-sistrix fab","fa-sitemap far","fa-sith fab","fa-skating far","fa-sketch fab","fa-skiing far","fa-skiing-nordic far","fa-skull far","fa-skull-crossbones far","fa-skyatlas fab","fa-skype fab","fa-slack fab","fa-slack-hash fab","fa-slash far","fa-sleigh far","fa-sliders-h far","fa-slideshare fab","fa-smile far","fa-smile-beam far","fa-smile-wink far","fa-smog far","fa-smoking far","fa-smoking-ban far","fa-sms far","fa-snapchat fab","fa-snapchat-ghost fab","fa-snapchat-square fab","fa-snowboarding far","fa-snowflake far","fa-snowman far","fa-snowplow far","fa-soap far","fa-socks far","fa-solar-panel far","fa-sort far","fa-sort-alpha-down far","fa-sort-alpha-down-alt far","fa-sort-alpha-up far","fa-sort-alpha-up-alt far","fa-sort-amount-down far","fa-sort-amount-down-alt far","fa-sort-amount-up far","fa-sort-amount-up-alt far","fa-sort-down far","fa-sort-numeric-down far","fa-sort-numeric-down-alt far","fa-sort-numeric-up far","fa-sort-numeric-up-alt far","fa-sort-up far","fa-soundcloud fab","fa-sourcetree fab","fa-spa far","fa-space-shuttle far","fa-speakap fab","fa-speaker-deck fab","fa-spell-check far","fa-spider far","fa-spinner far","fa-splotch far","fa-spotify fab","fa-spray-can far","fa-square far","fa-square-full far","fa-square-root-alt far","fa-squarespace fab","fa-stack-exchange fab","fa-stack-overflow fab","fa-stackpath fab","fa-stamp far","fa-star far","fa-star-and-crescent far","fa-star-half far","fa-star-half-alt far","fa-star-of-david far","fa-star-of-life far","fa-staylinked fab","fa-steam fab","fa-steam-square fab","fa-steam-symbol fab","fa-step-backward far","fa-step-forward far","fa-stethoscope far","fa-sticker-mule fab","fa-sticky-note far","fa-stop far","fa-stop-circle far","fa-stopwatch far","fa-stopwatch-20 far","fa-store far","fa-store-alt far","fa-store-alt-slash far","fa-store-slash far","fa-strava fab","fa-stream far","fa-street-view far","fa-strikethrough far","fa-stripe fab","fa-stripe-s fab","fa-stroopwafel far","fa-studiovinari fab","fa-stumbleupon fab","fa-stumbleupon-circle fab","fa-subscript far","fa-subway far","fa-suitcase far","fa-suitcase-rolling far","fa-sun far","fa-superpowers fab","fa-superscript far","fa-supple fab","fa-surprise far","fa-suse fab","fa-swatchbook far","fa-swift fab","fa-swimmer far","fa-swimming-pool far","fa-symfony fab","fa-synagogue far","fa-sync far","fa-sync-alt far","fa-syringe far","fa-table far","fa-table-tennis far","fa-tablet far","fa-tablet-alt far","fa-tablets far","fa-tachometer-alt far","fa-tag far","fa-tags far","fa-tape far","fa-tasks far","fa-taxi far","fa-teamspeak fab","fa-teeth far","fa-teeth-open far","fa-telegram fab","fa-telegram-plane fab","fa-temperature-high far","fa-temperature-low far","fa-tencent-weibo fab","fa-tenge far","fa-terminal far","fa-text-height far","fa-text-width far","fa-th far","fa-th-large far","fa-th-list far","fa-the-red-yeti fab","fa-theater-masks far","fa-themeco fab","fa-themeisle fab","fa-thermometer far","fa-thermometer-empty far","fa-thermometer-full far","fa-thermometer-half far","fa-thermometer-quarter far","fa-thermometer-three-quarters far","fa-think-peaks fab","fa-thumbs-down far","fa-thumbs-up far","fa-thumbtack far","fa-ticket-alt far","fa-tiktok fab","fa-times far","fa-times-circle far","fa-tint far","fa-tint-slash far","fa-tired far","fa-toggle-off far","fa-toggle-on far","fa-toilet far","fa-toilet-paper far","fa-toilet-paper-slash far","fa-toolbox far","fa-tools far","fa-tooth far","fa-torah far","fa-torii-gate far","fa-tractor far","fa-trade-federation fab","fa-trademark far","fa-traffic-light far","fa-trailer far","fa-train far","fa-tram far","fa-transgender far","fa-transgender-alt far","fa-trash far","fa-trash-alt far","fa-trash-restore far","fa-trash-restore-alt far","fa-tree far","fa-trello fab","fa-trophy far","fa-truck far","fa-truck-loading far","fa-truck-monster far","fa-truck-moving far","fa-truck-pickup far","fa-tshirt far","fa-tty far","fa-tumblr fab","fa-tumblr-square fab","fa-tv far","fa-twitch fab","fa-twitter fab","fa-twitter-square fab","fa-typo3 fab","fa-uber fab","fa-ubuntu fab","fa-uikit fab","fa-umbraco fab","fa-umbrella far","fa-umbrella-beach far","fa-uncharted fab","fa-underline far","fa-undo far","fa-undo-alt far","fa-uniregistry fab","fa-unity fab","fa-universal-access far","fa-university far","fa-unlink far","fa-unlock far","fa-unlock-alt far","fa-unsplash fab","fa-untappd fab","fa-upload far","fa-ups fab","fa-usb fab","fa-user far","fa-user-alt far","fa-user-alt-slash far","fa-user-astronaut far","fa-user-check far","fa-user-circle far","fa-user-clock far","fa-user-cog far","fa-user-edit far","fa-user-friends far","fa-user-graduate far","fa-user-injured far","fa-user-lock far","fa-user-md far","fa-user-minus far","fa-user-ninja far","fa-user-nurse far","fa-user-plus far","fa-user-secret far","fa-user-shield far","fa-user-slash far","fa-user-tag far","fa-user-tie far","fa-user-times far","fa-users far","fa-users-cog far","fa-users-slash far","fa-usps fab","fa-ussunnah fab","fa-utensil-spoon far","fa-utensils far","fa-vaadin fab","fa-vector-square far","fa-venus far","fa-venus-double far","fa-venus-mars far","fa-vest far","fa-vest-patches far","fa-viacoin fab","fa-viadeo fab","fa-viadeo-square fab","fa-vial far","fa-vials far","fa-viber fab","fa-video far","fa-video-slash far","fa-vihara far","fa-vimeo fab","fa-vimeo-square fab","fa-vimeo-v fab","fa-vine fab","fa-virus far","fa-virus-slash far","fa-viruses far","fa-vk fab","fa-vnv fab","fa-voicemail far","fa-volleyball-ball far","fa-volume-down far","fa-volume-mute far","fa-volume-off far","fa-volume-up far","fa-vote-yea far","fa-vr-cardboard far","fa-vuejs fab","fa-walking far","fa-wallet far","fa-warehouse far","fa-watchman-monitoring fab","fa-water far","fa-wave-square far","fa-waze fab","fa-weebly fab","fa-weibo fab","fa-weight far","fa-weight-hanging far","fa-weixin fab","fa-whatsapp fab","fa-whatsapp-square fab","fa-wheelchair far","fa-whmcs fab","fa-wifi far","fa-wikipedia-w fab","fa-wind far","fa-window-close far","fa-window-maximize far","fa-window-minimize far","fa-window-restore far","fa-windows fab","fa-wine-bottle far","fa-wine-glass far","fa-wine-glass-alt far","fa-wix fab","fa-wizards-of-the-coast fab","fa-wodu fab","fa-wolf-pack-battalion fab","fa-won-sign far","fa-wordpress fab","fa-wordpress-simple fab","fa-wpbeginner fab","fa-wpexplorer fab","fa-wpforms fab","fa-wpressr fab","fa-wrench far","fa-x-ray far","fa-xbox fab","fa-xing fab","fa-xing-square fab","fa-y-combinator fab","fa-yahoo fab","fa-yammer fab","fa-yandex fab","fa-yandex-international fab","fa-yarn fab","fa-yelp fab","fa-yen-sign far","fa-yin-yang far","fa-yoast fab","fa-youtube fab","fa-youtube-square fab","fa-zhihu fab"
			// }}}
		],
	}},
	props: {
		classEmpty: {type: String, default: 'btn btn-light'},
		classActive: {type: String, default: 'btn btn-light'},
		iconEmpty: {type: String, default: 'fas fa-flag'},
		showTitle: {type: Boolean, default: true},
		value: {type: String},
	},
	computed: {
		/**
		* Either the full list of available icons OR the filtered list if we have a search string
		* @returns {Array<String>}
		*/
		iconResults() {
			let searchRe = this.search && new RegExp(this.search.split(/\s+/).map(word => regexpEscape(word)).join('|'), 'i');

			return searchRe
				? this.icons.filter(i => searchRe.test(i))
				: this.icons;
		},


		/**
		* A human readable friendly name for the currently selected icon class
		* @returns {String}
		*/
		selectedName() {
			if (!this.selected || !this.showTitle) return '';
			return this.selected.replace(/^fa-(.+?)\s.*$/, '$1');
		},
	},
	methods: {
		/**
		* Change the selected icon + emit the change events
		* @param {String} icon The icon class to select, or null for reset
		*/
		setSelected(icon) {
			this.selected = icon;
			this.$emit('change', icon);
			this.$emit('update:modelValue', icon);
		},


		/**
		* Toggle whether the picker is shown
		* @param {Boolean|'toggle'} [show='toggle'] Show whether the picker area is shown
		*/
		showPicker(show = 'toggle') {
			this.isPicking =
				show === 'toggle' ? !this.isPicking
				: show;

			this.$refs.tooltip[this.isPicking ? 'show' : 'hide']();
		},


		/**
		* React to the icon picker being shown
		* @param {Event} e The event emitted by Vue-Tippy when the tooltip area is shown
		*/
		handlePickerShow(e) {
			setTimeout(()=> { // Wait for UI to catch up
				chainable(e.popper)
					.set('style.pointerEvents', 'auto') // Make tooltip interactive
					.set('style.maxWidth', '370px')
					// .method('classList.add', 'select-icon-panel-root') // Set manging CSS class

				// FIXME: The above chainable method doens't get called so we do it manually
				e.popper.classList.add('select-icon-panel-root');

				// Focus search area
				e.popper.querySelector('[type=search]').focus();
			});
		},
	},
	watch: {
		// React to value changes by copying the incoming value into `selected`
		value: {
			immediate: true,
			handler(v) {
				this.selected = v;
			},
		},
	},
}
</script>

<template>
	<div class="select-icon">
		<tooltip
			ref="tooltip"
			:hide-on-click="false"
			placement="bottom"
			trigger="manual"
			:on-hidden="()=> isPicking = false"
			:on-show="handlePickerShow"
			:on-click-outside="()=> showPicker(false)"
		>
			<template #default>
				<a @click="showPicker(true)" :class="selected ? classActive : classEmpty">
					<i :class="selected || iconEmpty"/>
					{{selectedName}}
				</a>
			</template>
			<template #content>
				<div class="select-icon-panel">
					<div class="search-header">
						<div class="form-control">
							<div class="input-group">
								<div class="input-group-text">
									<i class="fas fa-search"/>
								</div>
								<input v-model="search" type="search" class="form-control" v-focus/>
							</div>
						</div>
					</div>
					<div class="search-results">
						<a
							v-for="icon in iconResults"
							:key="icon"
							class="btn"
							:class="selected == icon ? 'btn-primary' : 'btn-light'"
							@mousedown="setSelected(icon)"
						>
							<i class="icon" :class="icon"/>
						</a>
					</div>
				</div>
			</template>
		</tooltip>
	</div>
</template>

<style lang="scss">
.select-icon {
	& i {
		margin: 0;
	}
}

/* Disable transition effects for this element and nested elements by default*/
.select-icon-panel-root, .select-icon-panel-root * {
	transition: none;
}

/* Top level popup handled by tippy, added dynamically when shown */
.select-icon-panel-root {
	/* Hacks to restyle tippy tooltip to look like a card panel */
	& .tippy-content {
		background: transparent;
	}

	& .tippy-content {
		padding: 0;
		border: 1px solid var(--bs-border-color);
		border-radius: 10px;
		box-shadow: 0px 0px 10px #000000A0;
		background: var(--bs-body-bg);
	}

	& .select-icon-panel {
		& .search-header {
			margin-bottom: 5px;
		}

		& .search-results {
			max-height: 350px;
			overflow: auto;
			padding: 5px;

			& .btn {
				width: 40px;

				& i {
					margin: 0;
				}
			}
		}
	}
}
</style>
