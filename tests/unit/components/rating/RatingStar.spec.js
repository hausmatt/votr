import {shallowMount, mount} from '@vue/test-utils';
import RatingStar from '@/components/rating/RatingStar.vue';
import '@/core/material';

describe('RatingStar.vue', () => {
    it('renders a full star when passed in 1', () => {
        const wrapper = mount(RatingStar, {
            propsData: {
                starValue: 1,
                isInput: true
            }
        });
        expect(wrapper.find('i.md-icon').text()).toEqual('star');
        expect(wrapper.find('i.md-icon.md-icon-orange').exists()).toBeTruthy();
    });
});
