import { mount } from '@vue/test-utils'
import TableComponent from '@/components/TableComponent.vue'

describe('TableComponent.vue', () => {
  const headers = ['ID', 'Name', 'Status']
  const data = [
    { id: 1, name: 'John Doe', status: 'Pending' },
    { id: 2, name: 'Jane Smith', status: 'Completed' },
    { id: 3, name: 'Bob Lee', status: 'Failed' },
    { id: 4, name: 'Alice', status: 'Active' },
    { id: 5, name: 'Mark', status: 'Assigned' },
    { id: 6, name: 'Luna', status: 'Pending' },
  ]
  const actions = ['view', 'edit', 'delete']

  it('renders table headers correctly', () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data },
    })
    headers.forEach((header) => {
      expect(wrapper.html()).toContain(header)
    })
  })

  it('renders correct number of rows based on perPage', () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data, perPage: 5 },
    })
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(5)
  })

  it('renders Actions column when actions prop is provided', () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data, actions },
    })
    expect(wrapper.html()).toContain('Actions')
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data, actions },
      global: {
        stubs: ['RouterLink', 'font-awesome-icon'],
      },
    })

    const deleteButton = wrapper.find('button')
    await deleteButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('delete')
    expect(wrapper.emitted('delete')[0][0]).toEqual(data[0])
  })

  it('handles pagination correctly', async () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data, perPage: 2 },
    })

    expect(wrapper.text()).toContain('Showing 1 to 2 of 6')

    await wrapper.findAll('button')[1].trigger('click') // Go to page 2
    expect(wrapper.text()).toContain('Showing 3 to 4 of 6')
  })

  it('applies correct class for status', () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data },
    })
    const pendingCell = wrapper.findAll('tbody tr td')[2] // status column
    expect(pendingCell.classes()).toContain('text-yellow-400')
  })
})
