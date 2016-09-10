import { connect } from 'react-redux'
import { action } from '../modules/<%= pascalEntityName %>'
import <%= pascalEntityName %> from '../components/<%= pascalEntityName %>'

const mapActionCreators = {
  action: () => action(1)
}

const mapStateToProps =
  state => ({
  })

export default connect(mapStateToProps, mapActionCreators)(<%= pascalEntityName %>)
