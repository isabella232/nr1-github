import React from 'react'
import PropTypes from 'prop-types'

import ReactMarkdown from 'react-markdown'
import Github from './github'

export default class ReadMe extends React.Component {
  static propTypes = {
    nr1: PropTypes.object,
    owner: PropTypes.string,
    project: PropTypes.string,
    repository: PropTypes.string
  }

  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.repository != this.props.repository) {
      this.load()
    }
  }

  load() {
    const { owner, project } = this.props
    const path = `repos/${owner}/${project}/readme`
    const github = new Github()
    github.get(path).then(response => {
      const readme = atob(response.content)
      this.setState({ readme })
    })
  }

  render() {
    const { readme } = (this.state || {})

    return (
      <div className="markdown">
        <ReactMarkdown source={readme} escapeHtml={false} />
      </div>
    )
  }
}

