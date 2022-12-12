import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';

import adviceOffices from "../icons/advice-offices.svg";
import legalAidSouthAfrica from "../icons/legal-aid-south-africa.svg";
import legalPracticeCountil from "../icons/legal-practice-council.svg";
import ngoLawClinics from "../icons/ngo-law-clinics.svg";
import rentalHousingTribunal from "../icons/rental-housing-tribunal.svg";
import universityLawClinics from "../icons/university-law-clinics.svg";



import {Icon} from 'leaflet';


import offices from '../offices.csv';


export class Map extends React.Component {


    constructor(){
        super();
        this.state = {
            center: [-30.559482, 22.937506],
            zoom: 6,
            options: [],
            loading: false
        }
        this.mapRef = React.createRef();
        
    }

    componentDidMount() {}

    addressLookup = (e) => {
        let self = this;

        if (e.length > 3) {
            // Throttle the number of requests sent
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.timeout = null;

                axios.get(`https://nominatim.openstreetmap.org/search?q=${e}&format=json&polygon=1&addressdetails=1`)
                .then(function (response) {
                    
                    self.setState({options: response.data.map((item) => {
                        return {
                            value: item,
                            label: item.display_name
                        }
                    })})
                })
                
            }, 1000);
        }
    }

    officeIcon = (office) => {

        let iconUrl = adviceOffices;

        if(office == "Advice Offices") {
            iconUrl = adviceOffices;
        } else if(office == "Legal Aid South Africa") {
            iconUrl = legalAidSouthAfrica;
        } else if(office == "Legal Practice Council") {
            iconUrl = legalPracticeCountil;
        } else if(office == "NGO Law Clinics") {
            iconUrl = ngoLawClinics;
        } else if(offices == "Rental Housing Tribunal") {
            iconUrl = rentalHousingTribunal;
        } else if(office == "University Law Clinics") {
            iconUrl = universityLawClinics;
        }

        return iconUrl;

    }

    render() {
        return (<>
            <div className="shadow-sm" style={{position: "relative", zIndex: "99999"}}>
                <Container style={{position: "relative", top: "2em"}} className="bg-white shadow-sm px-3 py-3 rounded">
                    <Row>
                        <Col>
                            <div className="search-box">
                                <input type="text" placeholder="Search for your address to find assistance near you..." onChange={(e) => this.addressLookup(e.target.value)} className={this.state.loading ? 'loading rounded' : 'rounded'}/>
                                <div className="search-options position-absolute">
                                    <ListGroup as="ul">
                                        {this.state.options.map((item, index) => {
                                            return <ListGroup.Item as="li" action key={index} onClick={() => {
                                                this.setState({center: [item.value.lat, item.value.lon], zoom: 13}, () => {
                                                    this.mapRef.current.setView(this.state.center, this.state.zoom);
                                                    this.setState({options: []});
                                                })
                                            }}>{item.label}</ListGroup.Item>
                                        })}
                                    </ListGroup>
                                </div>
                            </div>
                        </Col>
                        <Col sm="auto">
                            <div className="my-location">
                                <Button className="geolocation-btn" onClick={() => {
                                    if (window.navigator.geolocation) {
                                        window.navigator.geolocation.getCurrentPosition((position) => {
                                            this.setState({center: [position.coords.latitude, position.coords.longitude], zoom: 13}, () => {
                                                this.mapRef.current.setView(this.state.center, this.state.zoom);
                                            })
                                        })
                                    }
                                }}>Use my location</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            <MapContainer ref={this.mapRef} center={this.state.center} zoom={this.state.zoom} scrollWheelZoom={false} style={{height: '600px'}}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                
                {offices.map((office, index) => {
                    return (
                    (index != 0 && (office[9] != "" && office[10] != "")) &&
                        
                            <Marker 
                                key={index}
                                position={[parseFloat(office[9]), parseFloat(office[10])]}
                                icon={new Icon({iconUrl: this.officeIcon(office[1]), iconSize: [25, 41], iconAnchor: [12, 41]})}
                                >
                                <Popup>
                                    <p>
                                        {/* Icon */}
                                        <img src={this.officeIcon(office[1])} style={{width: "25px", height: "25px", marginRight: "10px"}} />
                                        <strong>{office[1]}</strong>
                                    </p>

                                    <p>
                                        <strong>{office[0]}</strong>
                                        <br/>
                                        {office[5]}
                                    </p>
                                    <p>
                                        <strong>{office[7]}</strong>
                                        <br />
                                        {office[3] != '' ? 
                                            <><strong>Tel: </strong> {office[3]}</>
                                        : ''}
                                        <br/>
                                        {office[4] != '' ? 
                                        <><strong>E-mail: </strong><a className="text-decoration-none" href={`mailto:${office[4]}`}>{office[4]}</a></>
                                        : ''}
                                        <br/>
                                        {office[6] != '' ?
                                        <><strong>Website: </strong><a className="text-decoration-none" href={`${office[6]}`}>{office[6]}</a></>
                                        : ''}
                                    </p>
                                </Popup>
                            </Marker>
                       
                    ) 
                    
                })}


            </MapContainer>
            
           
        </>)
    }

}
