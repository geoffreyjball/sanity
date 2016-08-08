import React, {PropTypes} from 'react'
import styles from 'style:@sanity/components/lists/default'
import ListItem from 'component:@sanity/components/lists/items/default'

export default class DefaultList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        index: PropTypes.string,
        content: PropTypes.node,
        extraContent: PropTypes.node,
        icon: PropTypes.node
      })
    ),
    onSelect: PropTypes.func,
    selectable: PropTypes.bool,
    selectedItemIndex: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    layout: PropTypes.oneOf(['media', 'block', 'string'])
  }

  static defaultProps = {
    selectedItemIndex: false
  }

  constructor(context, props) {
    super(context, props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(index) {
    this.props.onSelect(this.props.items.find(item => item.index === index))
  }

  render() {

    const {items, children, layout, className, selectedItemIndex} = this.props

    return (
      <div className={`${className} ${styles.root}`}>
        <div className={styles.inner}>
          <ul className={styles.list}>
            {
              !children && items && items.map((item, i) => {
                return (
                  <ListItem
                    layout={layout}
                    key={i}
                    title={item.title}
                    icon={item.icon}
                    onClick={this.handleSelect}
                    index={item.index}
                    selected={selectedItemIndex == item.index}
                  >
                    {item.content}
                  </ListItem>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
