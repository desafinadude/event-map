import React from 'react';
import axios from 'axios';

import L from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.css';	
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js';

import events from '../events.csv';

import marker from '../icons/openup-mark.png';



export class Map extends React.Component {


    constructor(){
        super();
        this.state = {
            center: [5, 23],
            zoom: 2,
            options: [],
            loading: false
        }
        this.mapRef = React.createRef();
        
    }

    componentDidMount() {


        var markerIcon = L.icon({
            iconUrl: 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/icon-stack?size=50&color=00975d&icon=fa-star-solid',
            iconSize: [50,50],
            iconAnchor: [25,25],
            popupAnchor: [25,25],
            shadowSize: [51,51]

        });



        var map = L.map('map').setView(this.state.center, this.state.zoom);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: ''
        }).addTo(map);

        var markers = L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
                var markers = cluster.getAllChildMarkers();
                var html = '<div class="circle">' + markers.length + '</div>';
                return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(32, 32) });
            },
            showCoverageOnHover: false,
            maxClusterRadius: 40,
            singleMarkerMode: true,
            animateAddingMarkers: true,
            animate: true
        });
        

        {events.map((event, index) => {
            return (
            (index != 0 && (event[9] != "" && event[10] != "")) &&
                markers.addLayer(L.marker([event[9], event[10]], {icon: markerIcon}).bindPopup(`<p><strong>${event[0]}</strong><br/>${event[2]}</p><p>${event[1]}</p><p><strong>${event[3]}</strong></p><p>${event[5]}</p>`)))
        })}
       
        markers.addTo(map);
        
    }

    

    

   

    personIcon = (person) => {

        let iconUrl = marker;

        // if(person == "Advice Offices") {
        //     iconUrl = adviceOffices;
        // } 

        return iconUrl;

    }

    render() {
        
        
        return (<>
            
            {/* <MapContainer ref={this.mapRef} center={this.state.center} zoom={this.state.zoom} scrollWheelZoom={false} style={{height: '600px'}} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <ZoomControl position="bottomright"/>

                


            </MapContainer> */}

            <div id="map" style={{height: '400px'}}></div>
            
           
        </>)
    }

}
