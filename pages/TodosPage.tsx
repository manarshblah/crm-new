
import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_TODOS } from '../constants';
import { PageWrapper, Card, Button, ClockIcon, UsersIcon, PhoneIcon, ListIcon, CheckIcon, Loader } from '../components/index';
import { Todo } from '../types';

type FilterType = 'all' | Todo['type'];

const TODO_ICONS: Record<Todo['type'], React.FC<React.SVGProps<SVGSVGElement>>> = {
    'Hold Reminder': ClockIcon,
    'Meeting': UsersIcon,
    'Call': PhoneIcon,
};

const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
};

export const TodosPage = () => {
    const { t } = useAppContext();
    const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [weekDays, setWeekDays] = useState<Date[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const getWeekDays = (startDate: Date): Date[] => {
            const days: Date[] = [];
            const date = new Date(startDate);
            const dayOfWeek = date.getDay();
            const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is sunday
            const monday = new Date(date.setDate(diff));
            for (let i = 0; i < 7; i++) {
                const day = new Date(monday);
                day.setDate(monday.getDate() + i);
                days.push(day);
            }
            return days;
        };
        setWeekDays(getWeekDays(new Date()));
    }, []);

    const handleCompleteTodo = (id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            const todoDate = new Date(todo.dueDate);
            const isDateMatch = isSameDay(todoDate, selectedDate);
            const isTypeMatch = activeFilter === 'all' || todo.type === activeFilter;
            return isDateMatch && isTypeMatch;
        });
    }, [todos, selectedDate, activeFilter]);
    
    const todosByDay = useMemo(() => {
        const counts = new Map<string, number>();
        todos.forEach(todo => {
            const dateStr = new Date(todo.dueDate).toDateString();
            counts.set(dateStr, (counts.get(dateStr) || 0) + 1);
        });
        return counts;
    }, [todos]);

    if (loading) {
        return (
            <PageWrapper title={t('todos')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title={t('todos')}>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Week Overview */}
                <aside className="w-full lg:w-1/4 xl:w-1/5">
                    <Card>
                        <h3 className="font-semibold mb-4">{t('thisWeek')}</h3>
                        <div className="space-y-2">
                            {weekDays.map((day, index) => {
                                const dayStr = day.toDateString();
                                const taskCount = todosByDay.get(dayStr) || 0;
                                const isToday = isSameDay(day, new Date());
                                const isSelected = isSameDay(day, selectedDate);

                                return (
                                    <button 
                                        key={index}
                                        onClick={() => setSelectedDate(day)}
                                        className={`w-full flex justify-between items-center p-2 rounded-md text-left transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                            <span className="text-xs">{day.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {isToday && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">{t('today')}</span>}
                                            {taskCount > 0 && <span className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${isSelected ? 'bg-primary-foreground text-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>{taskCount}</span>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>
                </aside>
                
                {/* Main Todos Area */}
                <main className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Button variant={activeFilter === 'all' ? 'primary' : 'ghost'} onClick={() => setActiveFilter('all')}><ListIcon className="w-4 h-4" /> {t('all')}</Button>
                        <Button variant={activeFilter === 'Meeting' ? 'primary' : 'ghost'} onClick={() => setActiveFilter('Meeting')}><UsersIcon className="w-4 h-4" /> {t('meeting')}</Button>
                        <Button variant={activeFilter === 'Call' ? 'primary' : 'ghost'} onClick={() => setActiveFilter('Call')}><PhoneIcon className="w-4 h-4" /> {t('call')}</Button>
                        <Button variant={activeFilter === 'Hold Reminder' ? 'primary' : 'ghost'} onClick={() => setActiveFilter('Hold Reminder')}><ClockIcon className="w-4 h-4" /> {t('reminder')}</Button>
                    </div>

                    <div className="space-y-4">
                        {filteredTodos.length > 0 ? (
                            filteredTodos.map(todo => {
                                const Icon = TODO_ICONS[todo.type];
                                return (
                                    <Card key={todo.id} className="flex items-center gap-4 p-4">
                                        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">{todo.type}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{todo.leadName} - {todo.leadPhone}</p>
                                            <p className="text-xs text-gray-500">{new Date(todo.dueDate).toLocaleDateString()}</p>
                                        </div>
                                        <Button variant="ghost" className="p-2 h-auto text-green-500 hover:bg-green-100 dark:hover:bg-green-900" onClick={() => handleCompleteTodo(todo.id)}>
                                            <CheckIcon className="w-6 h-6" />
                                        </Button>
                                    </Card>
                                );
                            })
                        ) : (
                            <Card className="text-center py-10">
                                <p className="text-gray-500 dark:text-gray-400">{t('noTasksForDate')} {selectedDate.toLocaleDateString()}.</p>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </PageWrapper>
    );
};
