import React,{Component} from 'react';
import classNames from 'classnames';
import DG from '2gis-maps';
import './map.less';
import '../../assets/main.less';

export default class Map extends Component {
    state = {
        markers: [],
        near: [],
    }

    setClickEvent = () => {
        this.state.map.on('click' , (e) => {
            const {latlng} = e;
            let marker = {
                latlng,
            };

            DG.marker(marker.latlng , {title: 'marker'}).addTo(this.state.map);
            this.setState({
                markers: [...this.state.markers , {
                    ...marker.latlng
                }]
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if ('markers' in nextProps && nextProps.markers.length > 1) {
            nextProps.markers.forEach(item => {
                this.setState({
                    markers: [ ...this.state.markers , {lat: item.lat , lng:  item.long} ]
                })
            })
        }

        if ('near' in nextProps && nextProps.near.length > 1) {
            nextProps.near.forEach(item => {
                let marker = DG.marker([item.lat , item.lng] , {
                    interactive: true,
                    zIndexOffset: 1000,
                    riseOnHover: true,
                }).bindPopup(item.name);

                marker.addTo(this.state.map);

                this.setState({
                    near: [marker , ...this.state.near]
                });
            })
        }
    }

    showMarkers = () => {
        if ('markers' in this.props && this.props.markers.length > 1) {
            this.props.markers.forEach(item => {
                let marker = DG.marker([item.lat , item.long] , {
                    interactive: true,
                    zIndexOffset: 1000,
                    riseOnHover: true,
                }).bindPopup('you have put me here');

                marker.on('click', (e) => {
                });

                marker.addTo(this.state.map);
            })
        }
    }

    getNearObjects = (type) => (event) => {
        this.props.getNearObjects({
            type,
            radius: 500,
            location: this.state.userLoc,
        });
    }


    componentDidMount() {

        this.props.getMarkers();

        let map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13,
        });

        map.locate({setView: true, watch: true})
            .on('locationfound', (e) => {
               let marker =  DG.marker([e.latitude, e.longitude] , {
                    interactive: true,
                    zIndexOffset: 1000
                }).bindPopup('You are in here');

                this.setState({userLoc: e.latitude+','+e.longitude})

                marker.on('click' , (e) => {
                });

                marker.addTo(this.state.map);
            });        
        this.setState({map}, () => {
            {this.setClickEvent()}
        });
    }

    saveMarkers = () => {
        this.props.saveMarkers(this.state.markers);
    }

    render() {
        return (<div className={classNames('wrapper' , 'column' , 'centered')}>
            <div className={classNames('column')}>
                <div id='map' style={{minWidth: 500, height: '400px', marginTop: 20}}></div>
            </div>
            <div>
                <button  className={'save-btn'} onClick={this.saveMarkers}>Save markers</button>
                <button className={'show-btn'} onClick={this.showMarkers}>Show markers</button>
            </div>
            <div>
                <ul>
                    <li onClick={this.getNearObjects('pharmacies')}>pharmacies</li>
                    <li onClick={this.getNearObjects('gas stations')}>gas stations</li>
                    <li onClick={this.getNearObjects('schools')}>schools</li>
                    <li onClick={this.getNearObjects('restaurants')}>restaurants</li>
                </ul>
            </div>
        </div>)
    }
}
