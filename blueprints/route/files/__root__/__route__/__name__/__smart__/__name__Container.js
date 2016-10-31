import { connect } from 'react-redux'
import { action } from '../<%= __module__ %>/<%= camelEntityName %>'
import <%= pascalEntityName %> from '../<%= __dumb__ %>/<%= pascalEntityName %>'

const mapActionCreators = {
  action: () => action(1)
}

const mapStateToProps =
  state => ({
  })

export default connect(mapStateToProps, mapActionCreators)(<%= pascalEntityName %>)
