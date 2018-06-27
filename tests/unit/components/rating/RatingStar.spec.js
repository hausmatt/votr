import {mount} from '@vue/test-utils';
import RatingStar from '@/components/rating/RatingStar.vue';
import '@/core/material';

describe('RatingStar.vue', () => {
    it('renders a full star when passed in 1', () => {
        const wrapper = mount(RatingStar, {
            propsData: {
                starValue: 1
            }
        });
        expect(wrapper.find('i.md-icon').text()).toEqual('star');
    });

    it('renders a half star when passed in 0.5', () => {
        const wrapper = mount(RatingStar, {
            propsData: {
                starValue: 0.5
            }
        });
        expect(wrapper.find('i.md-icon').text()).toEqual('star_half');
    });

    it('renders an empty star when passed in 0', () => {
        const wrapper = mount(RatingStar, {
            propsData: {
                starValue: 0
            }
        });
        expect(wrapper.find('i.md-icon').text()).toEqual('star_border');
    });

    it('renders any star in orange when isInput is set to true', () => {
        const wrapper = mount(RatingStar, {
            propsData: {
                starValue: 0,
                isInput: true
            }
        });
        expect(wrapper.find('i.md-icon.md-icon-orange').exists()).toBeTruthy();
    });
});
