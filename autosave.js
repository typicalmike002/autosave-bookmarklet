javascript:(function(window, document, undefined) {

                'use strict';

                var app = {

                                'updateData': function( obj, dataId ) {

                                                let data = JSON.stringify( obj );

                                                localStorage.setItem( dataId, data );

                                },

                                'loadData': function( dataId ) {

                                                let data = localStorage.getItem( dataId );

                                                var dataParsed = JSON.parse( data );

                                                return dataParsed;

                                },

                                'removeData': function( dataId ) {

                                                localStorage.removeItem( dataId );

                                },

                                'createTagListener': function( tag, func ) {

                                                let elements = document.getElementsByTagName( tag );

                                                var anchor = [];

                                                for ( let i = 0, l = elements.length; i < l; i++ ) {

                                                                anchor = elements[i];

                                                                anchor.addEventListener( 'keyup', func, false );
                                                                anchor.addEventListener( 'keydown', func, false );
                                                                anchor.addEventListener( 'change', func, false );

                                                }

                                },

                                'getTagValues': function( tag ) {

                                                var obj = {};

                                                let elements = document.getElementsByTagName( tag );

                                                for ( let i = 0, l = elements.length; i < l; i++ ) {

                                                                let elem = elements[i],

                                                                id = elem.id || i,

                                                                inputType = elem.type;

                                                                switch ( inputType ) {

                                                                                case 'checkbox':

                                                                                                obj[id] = elem.checked;

                                                                                                break;

                                                                                case 'hidden':

                                                                                                break;

                                                                                case 'submit':

                                                                                                break;

                                                                                default: 

                                                                                                obj[id] = elem.value;

                                                                                                break;

                                                                }

                                                }

                                                obj.changeValue = function( id, newValue ) {

                                                                this[id] = newValue;

                                                };

                                                return obj;

                                },

                                'updateTagValues': function( tag, obj ) {

                                                var elements = document.getElementsByTagName( tag );

                                                for ( let i = 0, l = elements.length; i < l; i++ ) {

                                                                let elem = elements[i],

                                                                id = elem.id || i,

                                                                inputType = elem.type;

                                                                switch ( inputType ) {

                                                                                case 'checkbox':

                                                                                                elem.checked = obj[id];

                                                                                                break;

                                                                                case 'hidden':

                                                                                                break;

                                                                                case 'submit':

                                                                                                break;

                                                                                default:

                                                                                                elem.value = obj[id];

                                                                                                break;

                                                                }

                                                }

                                }

                };

                var inputObj = app.getTagValues( 'input' ),

                selectObj = app.getTagValues( 'select' );

                app.createTagListener( 'input', saveDataEvent( inputObj, 'inputData' ) );

                app.createTagListener( 'select', saveDataEvent( selectObj, 'selectData' ) );

                function saveDataEvent( obj, dataId ) {

                                return function() {

                                                let inputType = this.type;

                                                switch ( inputType ) {

                                                                case 'checkbox':

                                                                                obj.changeValue( this.id, this.checked );

                                                                                app.updateData( obj, dataId );

                                                                                break;

                                                                case 'hidden':

                                                                                break;

                                                                case 'submit':

                                                                                break;

                                                                default:

                                                                                obj.changeValue( this.id, this.value );

                                                                                app.updateData( obj, dataId );

                                                                                break;

                                                }

                                }              

                }

                if ( window.confirm( 'Autosave bookmarklet has been loaded and will now autosave changes made to HTML Forms.\n\n - Press OK to load any saved data. \n\n - Press Cancel to delete and create new data.' ) ) {

                                var inputData = app.loadData( 'inputData' ),

                                selectData = app.loadData( 'selectData' );

                                app.updateTagValues( 'input', inputData );

                                app.updateTagValues( 'select', selectData );

                } else {

                                app.removeData( 'inputData' );

                                app.removeData( 'selectData' );

                                app.updateData( 'inputData', inputObj );

                                app.updateData( 'selectData', selectObj );

                }

                app.updateData( inputObj, 'inputData' );

                app.updateData( selectObj, 'selectData' );
 
}(window, document));
