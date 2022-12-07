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
        }
        
    }

    componentDidMount() {

        console.log(offices);



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

            <MapContainer center={[-30.559482, 22.937506]} zoom={6} scrollWheelZoom={false} style={{height: '600px'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
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