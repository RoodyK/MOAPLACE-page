<template>
    <div id="wrap">
        <SideMenu largeCategory="대관관리" mediumCategory="월간일정"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">대관관리 - 월간일정</h2>
                <div>
                    <v-sheet tile="tile" height="54" class="d-flex">
                        <v-btn icon="icon" class="ma-2" @click="$refs.calendar.prev()">
                            <i class="material-icons">navigate_before</i>
                        </v-btn>
                        <v-select
                            v-model="type"
                            :items="types"
                            dense="dense"
                            outlined="outlined"
                            hide-details="hide-details"
                            class="ma-2"
                            label="type"></v-select>
                        <v-select
                            v-model="mode"
                            :items="modes"
                            dense="dense"
                            outlined="outlined"
                            hide-details="hide-details"
                            label="event-overlap-mode"
                            class="ma-2"></v-select>
                        <v-select
                            v-model="weekday"
                            :items="weekdays"
                            dense="dense"
                            outlined="outlined"
                            hide-details="hide-details"
                            label="weekdays"
                            class="ma-2"></v-select>
                        <v-spacer></v-spacer>
                        <v-btn icon="icon" class="ma-2" @click="$refs.calendar.next()">
                            <i class="material-icons">navigate_next</i>
                        </v-btn>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar
                            ref="calendar"
                            v-model="value"
                            :weekdays="weekday"
                            :type="type"
                            :events="events"
                            :event-overlap-mode="mode"
                            :event-overlap-threshold="30"
                            :event-color="getEventColor"
                            @change="getEvents"></v-calendar>
                    </v-sheet>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import SideMenu from '@/components/admin/SideMenu.vue'
    export default {
        components: {
            SideMenu
        },
        data: () => ({
            type: 'month',
            types: [
                'month', 'week', 'day', '4day'
            ],
            mode: 'stack',
            modes: [
                'stack', 'column'
            ],
            weekday: [0,1,2,3,4,5,6],
            weekdays: [
                {
                    text: 'Sun - Sat',
                    value: [0,1,2,3,4,5,6]
                }, {
                    text: 'Mon - Sun',
                    value: [1,2,3,4,5,6,0]
                }, {
                    text: 'Mon - Fri',
                    value: [1, 2, 3, 4, 5]
                }, {
                    text: 'Mon, Wed, Fri',
                    value: [1, 3, 5]
                }
            ],
            value: '',
            events: [],
            colors: ['blue','indigo','deep-purple','cyan','green','orange','grey darken-1'],
            names: ['Meeting', 'Holiday','PTO','Travel','Event','Birthday','Conference','Party']
        }),
        methods: {
            getEvents({start, end}) {
                const events = []
                const min = new Date(`${start.date}T00:00:00`)
                const max = new Date(`${end.date}T23:59:59`)
                const days = (max.getTime() - min.getTime()) / 86400000
                const eventCount = this.rnd(days, days + 20)
                for (let i = 0; i < eventCount; i++) {
                    const allDay = this.rnd(0, 3) === 0
                    const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                    const secondTimestamp = this.rnd(
                        2,
                        allDay
                            ? 288
                            : 8
                    ) * 900000
                    const second = new Date(first.getTime() + secondTimestamp)
                    events.push({
                        name: this.names[this.rnd(0, this.names.length - 1)],
                        start: first,
                        end: second,
                        color: this.colors[this.rnd(0, this.colors.length - 1)],
                        timed: !allDay
                    })
                }
                this.events = events
            },
            getEventColor(event) {
                return event.color
            },
            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    @import "@/scss/common.scss";
    //삭제필요
    $brown: #826D5E;
    nav {
        display: none !important;
    }
    * {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    // 관리자 페이지 레이아웃 관련 시작------------------
    #wrap {
        padding-left: 240px;
        background: #f7f9fa;
        #main {
            width: 100%;
            min-height: 100vh;
            padding: 32px;
            box-sizing: border-box;
            .inner {
                width: $width;
                min-height: 650px;
                margin: 0 auto;
                border: 1px solid rgba($black, 0.5);
                background: #fff;
                padding: 32px;
                h2.title {
                    font-size: 24px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid rgba($black, 0.5);
                    margin-bottom: 16px;
                }
            }
            // 관리자 페이지 레이아웃 관련 끝------------------

            .state-box {
                width: 100%;
                border: 1px solid rgba($black, 0.5);
                padding: 8px 16px;
                span {
                    border-right: 1px solid rgba($black, 0.5);
                    padding-right: 16px;
                    margin-right: 16px;
                    font-weight: bold;
                }
                select {
                    padding: 4px;
                }
            }
            .info-box {
                margin: 32px 0;
                h3 {
                    font-size: 20px;
                    margin-bottom: 16px;
                }
                div {
                    border-top: 1px solid $black;
                    padding-top: 16px;
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        border-top: 1px solid rgba($black,0.3);
                        border-width: 1px 0;

                        tr {
                            td,
                            th {
                                padding: 8px 16px;
                                border-bottom: 1px solid rgba($black, 0.3);
                            }
                            th {
                                width: 15%;
                                background: #eee;
                                text-align: center;
                            }

                        }
                    }
                }

            }
            .answer-box {
                margin-bottom: 32px;
                h3 {
                    font-size: 20px;
                    margin-bottom: 16px;
                }
                textarea {
                    width: 100%;
                    border-color: rgba($black, 0.3);
                    padding: 16px;
                }
            }
            .btn-box {
                width: 100%;
                display: flex;
                justify-content: space-between;
                button {
                    width: calc((100% - 16px) /2);
                    padding: 12px 0;
                    border: none;
                    &:last-child {
                        background-color: $brown;
                        color: #fff;
                    }
                }
            }
        }

    }
</style>