/* eslint-disable no-undef */
// As google script loaded on demand, need to disabled undefined errors
// Otherwise we will get 'google is not defined'

import $ from 'jquery';

const GOOGLE_APIKEY = "AIzaSyAIA7flNULGc7eA3pfeODurEG3qtSY19lw";

export default {
    scriptsLoading: false,
    scriptsReady: false,
    onReadyFns: [],

    autocomplete: function(inputEl, onChange) {
        if(!this.scriptsReady) {
            if(!this.scriptsLoading) this.loadGoogleMapsAndPlaces();
            this.onReadyFns.push(() => this.autocomplete(inputEl, onChange));
        } else {
            var autocomplete = new google.maps.places.Autocomplete(inputEl, { 
                types: ['(cities)'], 
                componentRestrictions: { 
                    country: 'au' 
                } 
            });
    
            google.maps.event.addListener(autocomplete, 'place_changed', () => {
                onChange(autocomplete.getPlace());
            });
        }
    },

    loadGoogleMapsAndPlaces: function(callbackFn) {
        this.scriptsLoading = true;

        $.getScript('https://www.google.com/jsapi', () => {
            window.google.load('maps', '3', { 
                //key here is restricted to this domain, so safely stored client side
                other_params: ['key=' + GOOGLE_APIKEY + '&libraries=places'], 
            callback: () => {
                this.scriptsReady = true;
                for(let fn of this.onReadyFns) fn();
            }});
        });
    }
}