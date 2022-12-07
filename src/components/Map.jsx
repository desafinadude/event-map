import React from 'react';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import markerIconPng from "../../node_modules/leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

import offices from '../offices.csv';


export class Map extends React.Component {


    constructor(){
        super();
        this.state = {
            center: [-30.559482, 22.937506],
            zoom: 6
        }
        // reference
        this.mapRef = React.createRef();
        
    }

    componentDidMount() {

       
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((position) => {
                this.setState({center: [position.coords.latitude, position.coords.longitude], zoom: 13}, () => {
                    this.mapRef.current.setView(this.state.center, this.state.zoom);
                })
                
            }, console.log);
        } 



    }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     if(this.props.a != prevProps.a || this.props.b.length != prevProps.b.length) {
    //         return true;
    //      } else {
    //         return null;
    //      }
    // }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (snapshot == true) {
            
    //     }
    // }

    

    render() {
        return (<>

            <MapContainer ref={this.mapRef}  center={this.state.center} zoom={this.state.zoom} scrollWheelZoom={true} style={{height: '600px'}}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                
                {offices.map((office, index) => {
                    return (
                    (index != 0 && index != 192) && 
                        <Marker 
                            key={index}
                            position={[parseFloat(office[8]), parseFloat(office[9])]}
                            icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
                            >
                            <Popup>
                                <p>
                                    <strong>{office[2]}</strong>
                                    <br/>
                                    {office[4]}
                                </p>
                                <p>
                                    <strong>{office[3]}</strong>
                                    <br />
                                    {office[5]}
                                </p>
                            </Popup>
                        </Marker>
                    )
                })}


            </MapContainer>
           
        </>)
    }

}
