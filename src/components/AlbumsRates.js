import React, { Component } from "react";
import { ResponsiveLine } from '@nivo/line'
//import data from '../datas/lineAlbumsRates'
import { API_KEY, API_URL } from '../helpers/ConstantManager';

class AlbumsRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      artistId: this.props.artistId,
      topAlbums: [
        {
          id: "",
          data: []
        }
      ]
    };
  }

  insertDataInState(albumName, albumRate){
    const topAlbumTmp = this.state.topAlbums
    const dataTmp = [...topAlbumTmp[0].data, {x: albumName, y: albumRate}]
    topAlbumTmp[0].data = dataTmp
    this.setState({topAlbums: topAlbumTmp})
  }

  async fetchTopAlbums() {
    const res  = await fetch(API_URL+"artist.albums.get?artist_id"+artistId+"&s_release_date=desc&g_album_name=1"+API_KEY);
    const data = await res.json();
    data.message.body.album_list.map(
      (elem) => {
        this.insertDataInState(elem.album.album_name, elem.album.album_rating)
    })
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  async componentWillMount(){
    await this.fetchTopAlbums();
  }

  render(){
    const { topAlbums, isLoaded} = this.state;
    //this.filterState();
    return(
      <div className="albumsRates">
        <h2>Notes des albums</h2>

        <div className="albumsRates-line">
        <ResponsiveLine
          data={topAlbums}
          margin={{ top: 50, right: 150, bottom: 50, left: 150 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', stacked: true, min: 0, max: 100 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 20,
              tickPadding: 15,
              tickRotation: -20,
              legend: '',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 20,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={20}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[]}
        />
        </div>
      </div>
    )
  }
}

export default AlbumsRates;
