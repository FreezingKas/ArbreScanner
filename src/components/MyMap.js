
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from '../helpers/styleMap';


export default class MyMap extends React.Component {
    constructor(props) {
        super(props) 
    }

    render() {
        return(
            <View style={styles.mapStyle}>
                <MapView
                    style={styles.mapStyle}
                    ref={map => this._map = map}
                    minZoomLevel={5}
                    initialRegion={{
                        latitude: 48.288786,
                        longitude: 6.950237,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    customMapStyle={mapStyle}>
                            {
                                this.props.dataArbre.map((marker) => {
                                    return(
                                        <Marker
                                            coordinate={{
                                                latitude: marker.latitude,
                                                longitude: marker.longitude,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421
                                            }}
                                            title={marker.name + " - " + marker.ville}
                                            key={marker.id}
                                            onCalloutPress={() => { this.props.nav.navigate("ArbreItem", {id : marker.id, data: this.props.dataArbre}) }}
                                        />
                                    )
                                }) 
                            } 
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
        height: "107%",
        alignItems: 'center',
        justifyContent: 'center'
    },
})
