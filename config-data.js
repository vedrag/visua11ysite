var visua11yData = {
    confirmanceData : [
		{
			level: "wcag2a",
			heading: "WCAG 2.0",
			subheading: "Level A",
			logo: "https://www.w3.org/WAI/wcag2A",
			link: "https://www.w3.org/WAI/WCAG2A-Conformance",
			alt: "Level A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",
			title: "Explanation of WCAG 2.0 Level A Conformance",
			scanTags: ['wcag2a', 'best-practice'],
			scanData: {}
		},
		{
			level: "wcag2aa",
			heading: "WCAG 2.0",
			subheading: "Level AA",
			logo: "https://www.w3.org/WAI/wcag2AA",
			link: "https://www.w3.org/WAI/WCAG2AA-Conformance",
			alt: "Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",
			title: "Explanation of WCAG 2.0 Level Double-A Conformance",
			scanTags: [ "wcag2aa"],
			scanData: {}
		},
		{
			level: "wcag2aaa",
			heading: "WCAG 2.0",
			subheading: "Level AAA",
			logo: "https://www.w3.org/WAI/wcag2AAA",
			link: "https://www.w3.org/WAI/WCAG2AAA-Conformance",
			alt: "Level Triple-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",
			title: "Explanation of WCAG 2.0 Level Triple-A Conformance",
			scanTags: [ "wcag2aaa"],
			scanData: {}
		},
		{
			level: "wcag21aa",
			heading: "WCAG 2.1",
			subheading: "Level AA",
			logo: "https://www.w3.org/WAI/WCAG21/wcag2.1AA-v",
			link: "https://www.w3.org/WAI/WCAG2.1AA-Conformance",
			alt: "Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.1",
			title: "Explanation of WCAG 2.1 Level Double-A Conformance",
			scanTags: ['wcag21a', 'wcag21aa'],
			scanData: {}
		},
		{
			level: "section508",
			heading: "Section 508",
			subheading: "Section 508",
			logo: "http://digitalinclusionnewslog.itu.int/wp-content/uploads/sites/9/2015/10/Section-508.png",
			link: "https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines",
			alt: "Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.1",
			title: "Explanation of WCAG 2.1 Level Double-A Conformance",
			scanTags: ['section508', 'best-practice'],
			scanData: {}
		}
    ],
    
    basicChecks : 
        { "wcag2a": 
            [{   
                type: "images",
                scanTags: {type: "rule", values: ["image-alt", "image-redundant-alt"]},
                icon: "fa-images",
                ruleText: [],
                scanData : {},
                passes: 0,
                violations: 0
            },
            {   
                type: "links",
                scanTags: {type: "rule", values: ["button-name", "link-name", "link-in-text-block"]},
                icon: "fa-link",
                ruleText: [],
                scanData : {},
                passes: 0,
                violations: 0
            },
            {
                type: "heading",
                scanTags: {type: "rule", values: ["heading-order"]},
                icon: "fa-heading",
                ruleText: [],
                scanData : {},
                passes: 0,
                violations: 0
            },
            {
                type: "roles",
                scanTags: {type: "rule", values: ["aria-roles", "aria-allowed-attr", "aria-allowed-role", "aria-required-attr", "aria-valid-attr", "aria-valid-attr-name"]},
                icon: "fa-registered",
                ruleText: [],
                scanData : {},
                passes: 0,
                violations: 0
            }],
    "wcag2aa": 
            [{   
                type: "colorcontrast",
                scanTags: {type: "rule", values: ["color-contrast"]},
                icon: "fa-images",
                ruleText: [],
                scanData : {},
                passes: 0,
                violations: 0
            },
            {   
                type: "videos",
                scanTags: {type: "rule", values: ["video-description"]},
                icon: "fa-link",
                ruleText: [],
                scanData : {},
                passes: 0,
                violations: 0
            },
            {
                type: "lang",
                scanTags: {type: "rule", values: ["valid-lang"]},
                icon: "fa-heading",
                ruleText: [],
                scanData : {},
                passes: 0,
                violations: 0
            }]
    }
}