import logging
from homeassistant.helpers.event import track_state_change
from homeassistant.const import STATE_ON, STATE_OFF, STATE_HOME, STATE_NOT_HOME, MATCH_ALL

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'battery'
DEPENDENCIES = []

def setup(hass, config=None):
    """Setup the Battery component. """
    _LOGGER.info("The 'battery' component is ready!")
    def state_changed(entity_id, old_state, new_state):
        if new_state is None:
            return
        if 'battery_level' in new_state.attributes:
            hass.states.set('%s_battery' % entity_id,
                            float(new_state.attributes['battery_level']),
                            {
                                'friendly_name': "%s Battery" % new_state.attributes['friendly_name'],
                                'unit_of_measurement': '%',
                                'icon': 'mdi:battery'
                            })

    track_state_change(hass, MATCH_ALL, state_changed)

    return True