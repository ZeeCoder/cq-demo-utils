import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContainerQuery as BaseContainerQuery } from "@zeecoder/react-container-query";
import processCSS from "./processCSS";

export default class ContainerQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: null
    };
  }

  componentDidMount() {
    processCSS(this.props.css).then(stats => this.setState({ stats }));
  }

  render() {
    return <BaseContainerQuery stats={this.state.stats} {...this.props} />;
  }
}

ContainerQuery.propTypes = {
  css: PropTypes.string
};
