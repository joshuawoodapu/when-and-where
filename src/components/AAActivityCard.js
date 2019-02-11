import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';

export default class AAActivityCard extends Component {
    renderInfo() {
      return(
        <View>
          <View style={styles.topRow}>
            <View style={styles.topLeft}>
              <Text style={styles.titleText}>
                {this.props.title}
              </Text>
            </View>
            <View style={styles.topRight}>
              {this.renderAdd()}
            </View>
          </View>

          <View style={styles.middleRow}>
            <Text style={styles.addressText}>
              {this.props.address}
            </Text>
          </View>
        </View>
      );
    }

    renderAdd() {
      if (this.props.add) {
        return(
          <Icon
            key={this.props.keyExtractor + "_add"}
            name='add'
            color='#2661B2'
            size={24}
          />
        );
      }
    }

    renderRating() {
      var rating = [];
      var emptyStars = 0;

      for(let i = 0; i < this.props.stars; i++) {
        rating.push(
          <Icon
              key={this.props.keyExtractor + "_star" + i.toString()}
              name='star'
              color='#FDAF17'
              size={14}
          />
        )
      }

      if (this.props.stars < 5){
        emptyStars = 5 - this.props.stars;
        for(let i = 0; i < emptyStars; i++) {
          rating.push(
            <Icon
                key={this.props.keyExtractor + "_unstar" + i.toString()}
                name='star'
                color='#B8BEC1'
                size={14}
            />
          )
        }
      }

      return (
        <View style={styles.bottomLeft}>
          { rating }
        </View>
      );
    }

    renderFavorite() {
      if (this.props.favorited) {
        return(
          <View style={styles.bottomRight}>
              <Icon
                  key={this.props.keyExtractor + "_fav"}
                  name='favorite'
                  color='#F387B8'
                  size={18}
              />
          </View>
        );
      }
      else {
        return(
          <View style={styles.bottomRight}>
              <Icon
                  key={this.props.keyExtractor + "_unfav"}
                  name='favorite-border'
                  color='#B8BEC1'
                  size={18}
              />
          </View>
        );
      }
    }

    render() {
        return (
            <Card containerStyle={styles.cardStyle}>
              <TouchableOpacity onPress={this.props.onCardPress}>
                  <View style={styles.parentView}>
                    {this.renderInfo()}
                    <View style={styles.bottomRow}>
                        {this.renderRating()}
                        <View style={styles.bottomRight}>
                          {this.renderFavorite()}
                        </View>
                    </View>
                  </View>
              </TouchableOpacity>
            </Card>
        );
    }
}

 const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        flexDirection: 'column'
    },
    titleText: {
        color: '#2661B2',
        fontWeight: 'bold',
        fontSize: 14
    },
    addressText: {
        color: '#2661B2',
        fontSize: 12
    },
    cardContainer: {
        padding: 0,
        flex: 1
    },
    plusIcon: {
        color: '#2661B2',
    },
    topRow: {
        flexDirection: 'row',
        flex: 1
    },
    topRight: {
        flex: 1,
        alignItems: 'flex-end'
    },
    topLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    middleRow: {
        flexDirection: 'row',
        flex: 1
    },
    bottomRow: {
        marginTop: 20,
        flexDirection: 'row',
        flex: 1,
        alignItems: "stretch",
    },
    bottomLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bottomRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },


    cardStyle: {
        marginTop: 15,
        borderWidth: 0,
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.16,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: '#fff'
    },
    sectionStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    notFavorited: {
      borderWidth: 1,
    },

});
