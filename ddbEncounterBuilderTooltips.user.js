// ==UserScript==
// @name         Allow homebrew spell tooltips in encounters
// @namespace    github.com/azmoria
// @version      0.2
// @description  Allow homebrew spell tooltips in encounters
// @author       Azmoria
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @downloadURL  https://github.com/Azmoria/ddbEncounterTooltips/raw/main/ddbEncounterBuilderTooltips.user.js
// @updateURL    https://github.com/Azmoria/ddbEncounterTooltips/raw/main/ddbEncounterBuilderTooltips.user.js
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @match        https://www.dndbeyond.com/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (!mutation.addedNodes) return

            for (let i = 0; i < mutation.addedNodes.length; i++) {
                // do things to your newly added nodes here
                let node = mutation.addedNodes[i]
                if ($(node).hasClass('tooltip-hover')){
                    if($(node).attr('href').startsWith("https://dndbeyond.com/linkout?remoteUrl=https://www.dndbeyond.com")){
                       $(node).attr('href', $(node).attr('href').replace("https://dndbeyond.com/linkout?remoteUrl=", ''))
                    }
                    if($(node).attr('data-tooltip-href') != undefined){

                        let tooltipData = $(node).attr('data-tooltip-href').replace(/.*\/(\d+)-tooltip/g, '/spells/$1/tooltip-json')
                        $(node).attr('data-tooltip-json-href', tooltipData)
                    }
                }
                else if ($(node).find('.tooltip-hover').length > 0){
                    let tooltipNodes = $(node).find('.tooltip-hover');
                    for(let i = 0; i<tooltipNodes.length; i++){
                      let currNode = $(tooltipNodes[i]);
                       if($(currNode).attr('href').startsWith("https://dndbeyond.com/linkout?remoteUrl=https://www.dndbeyond.com")){
                           $(currNode).attr('href', $(currNode).attr('href').replace("https://dndbeyond.com/linkout?remoteUrl=", ''))
                           if($(currNode).attr('data-tooltip-href') != undefined){
                               let tooltipData = $(currNode).attr('data-tooltip-href').replace(/.*\/(\d+)-tooltip/g, '/spells/$1/tooltip-json')
                               $(currNode).attr('data-tooltip-json-href', tooltipData)
                           }
                       }
                    }
                }
            }
        })
    })

    observer.observe(document.body, {
        childList: true
        , subtree: true
        , attributes: false
        , characterData: false
    })
})();
