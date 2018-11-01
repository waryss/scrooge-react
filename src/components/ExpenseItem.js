import React from 'react';
import PropTypes from 'prop-types';
import {Text, Icon, ListItem, Body, CheckBox} from 'native-base';

const ExpenseItem = ({toggle, remove, item}) => (
    <ListItem style={{flex: 1}}>
        <CheckBox onPress={toggle} checked={item.completed}/>
        <Body>
        <Text style={{alignSelf: 'center'}}>
            {item.text}
        </Text>
        </Body>
        <Icon name="md-trash" style={{color: '#000000'}} onPress={remove}/>
    </ListItem>
);

ExpenseItem.propTypes = {
    toggle: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired, //eslint-disable-line
};

export default ExpenseItem;
