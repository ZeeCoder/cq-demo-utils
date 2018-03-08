import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContainerQuery as BaseContainerQuery } from "@zeecoder/react-container-query";
import processCSS from "./processCSS";

export default class ContainerQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meta: null
    };
  }

  componentDidMount() {
    processCSS(this.props.css).then(meta => this.setState({ meta }));
  }

  render() {
    return <BaseContainerQuery meta={this.state.meta} {...this.props} />;
  }
}

ContainerQuery.propTypes = {
  css: PropTypes.string
};
