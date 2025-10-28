import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Layout from '@/layouts/MainLayout.vue'
import Sidebar from '@/components/navbar.vue'
import Topbar from '@/components/topbar.vue'
import Footer from '@/components/footer.vue'

describe('MainLayout.vue', () => {
  it('renders Sidebar, Topbar, and Footer', () => {
    const wrapper = mount(Layout, {
      global: {
        stubs: ['RouterView'],
      },
    })

    expect(wrapper.findComponent(Sidebar).exists()).toBe(true)
    expect(wrapper.findComponent(Topbar).exists()).toBe(true)
    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })

  it('renders RouterView content', () => {
    const wrapper = mount(Layout, {
      global: {
        stubs: {
          RouterView: { template: '<div>Mock Page</div>' },
        },
      },
    })

    expect(wrapper.html()).toContain('Mock Page')
  })
})
