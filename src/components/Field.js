// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import * as React from "react";
import {ListItem, Item, Label, Input, Body, Right} from "native-base";
import {observable, action} from "mobx";
import { observer } from "mobx-react/native";

interface FieldProps {
    label: string,
    defaultValue?: string,
    last?: boolean,
    inverse?: boolean,
    right?: () => React.Node,
    onChange?: string => mixed,
    textInputRef?: Input => void
}

@observer
export default class Field extends React.Component<FieldProps> {
    @observable value: string;

    componentWillMount() {
        this.setValue(this.props.defaultValue || "");
    }

    @autobind @action
    setValue(value: string) {
        const {onChange} = this.props;
        this.value = value;
        if (onChange) {
            onChange(value);
        }
    }

    render(): React.Node {
        const {label, last, inverse, defaultValue, right, textInputRef} = this.props;
        const style = inverse ? { color: "white" } : {};
        const itemStyle = inverse ? { borderColor: "white" } : {};
        const keysToFilter = ["right", "defaultValue", "inverse", "label", "last", "onChange"];
        const props = _.pickBy(this.props, (value, key) => keysToFilter.indexOf(key) === -1);
        const {value} = this;
        return (<ListItem {...{ last }} style={itemStyle}>
            <Body>
                <Item
                    style={{ borderBottomWidth: 0 }}
                    floatingLabel={!defaultValue}
                    stackedLabel={!!defaultValue}>
                    <Label {...{ style }}>{label}</Label>
                    <Input onChangeText={this.setValue} getRef={textInputRef} {...{ value, style }} {...props} />
                </Item>
            </Body>
            {
                right && <Right>{right()}</Right>
            }
        </ListItem>);
    }
}
