import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [reviewText, setReviewText] = useState('');
  const [reviewCount, setReviewCount] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [discountsEarned, setDiscountsEarned] = useState(0);
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (reviewText.length < 100) {
      toast({
        title: 'Отзыв слишком короткий',
        description: 'Минимальная длина отзыва — 100 символов',
        variant: 'destructive',
      });
      return;
    }

    const newCount = reviewCount + 1;
    setReviewCount(newCount);
    setTotalReviews(prev => prev + 1);
    setReviewText('');
    
    if (newCount >= 30) {
      setDiscountsEarned(prev => prev + 1);
      setReviewCount(0);
      toast({
        title: 'Поздравляем! 🎉',
        description: 'Вы получили скидку 300₽! Дерево начинает расти заново.',
      });
    } else {
      toast({
        title: 'Отзыв опубликован! 🎉',
        description: 'Ваше дерево подросло. Спасибо за обратную связь!',
      });
    }
    setActiveTab('garden');
  };

  const handleClaimDiscount = () => {
    setDiscountsEarned(prev => prev + 1);
    setReviewCount(0);
    toast({
      title: 'Скидка получена! 🎁',
      description: 'Промокод отправлен на вашу почту. Дерево начинает расти заново!',
    });
  };

  const currentCycleProgress = (reviewCount / 30) * 100;
  const treeStage = reviewCount < 10 ? 'sprout' : reviewCount < 20 ? 'small' : reviewCount < 30 ? 'medium' : 'full';

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Feedback Garden</span>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="User" size={16} className="mr-2" />
            Войти
          </Button>
        </div>
      </nav>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="container mx-auto px-4 py-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-8">
          <TabsTrigger value="home">
            <Icon name="Home" size={18} />
          </TabsTrigger>
          <TabsTrigger value="review">
            <Icon name="MessageSquare" size={18} />
          </TabsTrigger>
          <TabsTrigger value="garden">
            <Icon name="Sprout" size={18} />
          </TabsTrigger>
          <TabsTrigger value="business">
            <Icon name="BarChart3" size={18} />
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <Icon name="CreditCard" size={18} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Превратите отзывы в рост
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Платформа геймификации обратной связи. Каждый отзыв растит дерево. 30 отзывов = скидка 300₽
              </p>
              <Button size="lg" className="mt-8" onClick={() => setActiveTab('review')}>
                Оставить отзыв
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="QrCode" size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Сканируйте QR</h3>
                <p className="text-gray-600">Найдите QR-код на товаре и отсканируйте его камерой телефона</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Edit3" size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Пишите отзыв</h3>
                <p className="text-gray-600">Оставьте честный отзыв от 100 символов о вашей покупке</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Sprout" size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Растите дерево</h3>
                <p className="text-gray-600">Каждый отзыв растит ваше дерево. 30 отзывов = 300₽ скидка</p>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Для бизнеса</h2>
              <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
                Получайте больше отзывов, повышайте вовлечённость клиентов и растите продажи с помощью геймификации
              </p>
              <Button size="lg" variant="secondary" onClick={() => setActiveTab('business')}>
                Подключить бизнес
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="review" className="animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Оставьте свой отзыв</h2>
                <p className="text-gray-600">Минимум 100 символов</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Расскажите о вашем опыте с товаром..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <div className="mt-2 text-right">
                    <span className={`text-sm ${reviewText.length >= 100 ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {reviewText.length} / 100
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleSubmitReview}
                  disabled={reviewText.length < 100}
                >
                  Опубликовать отзыв
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </div>
            </Card>

            <div className="mt-6 bg-emerald-50 rounded-lg p-4 flex items-start gap-3">
              <Icon name="Info" size={20} className="text-emerald-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">После публикации:</p>
                <p>Отзыв автоматически появится на сайте товара, а ваше дерево подрастёт!</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="garden" className="animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваш сад</h2>
                <p className="text-gray-600">Текущий цикл: {reviewCount} из 30</p>
                <p className="text-sm text-gray-500 mt-1">Всего отзывов: {totalReviews} | Скидок получено: {discountsEarned}</p>
              </div>

              <div className="mb-8">
                <Progress value={currentCycleProgress} className="h-3" />
                <p className="text-center text-sm text-gray-600 mt-2">
                  {30 - reviewCount} отзывов до следующей скидки 300₽
                </p>
              </div>

              <div className="bg-gradient-to-b from-sky-100 to-emerald-50 rounded-2xl p-12 flex items-end justify-center min-h-[300px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-100 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  {treeStage === 'sprout' && (
                    <div className="animate-grow">
                      <div className="text-6xl">🌱</div>
                      <p className="text-sm text-gray-600 mt-2">Росток</p>
                    </div>
                  )}
                  {treeStage === 'small' && (
                    <div className="animate-grow">
                      <div className="text-8xl">🌿</div>
                      <p className="text-sm text-gray-600 mt-2">Саженец</p>
                    </div>
                  )}
                  {treeStage === 'medium' && (
                    <div className="animate-grow">
                      <div className="text-9xl">🌳</div>
                      <p className="text-sm text-gray-600 mt-2">Молодое дерево</p>
                    </div>
                  )}
                  {treeStage === 'full' && (
                    <div className="animate-grow">
                      <div className="text-9xl">🌲</div>
                      <p className="text-sm text-gray-600 mt-2">Полное дерево</p>
                    </div>
                  )}
                </div>
              </div>

              {reviewCount >= 30 && (
                <div className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-6 text-center">
                  <Icon name="Gift" size={32} className="mx-auto mb-2" />
                  <h3 className="text-xl font-bold mb-2">Поздравляем! 🎉</h3>
                  <p className="mb-4">Вы получили скидку 300₽</p>
                  <Button variant="secondary" size="lg" onClick={handleClaimDiscount}>
                    Получить промокод
                  </Button>
                  <p className="text-xs text-amber-100 mt-3">После получения скидки дерево начнёт расти заново</p>
                </div>
              )}
              
              {discountsEarned > 0 && reviewCount < 30 && (
                <div className="mt-6 bg-emerald-50 rounded-lg p-4 text-center">
                  <Icon name="Award" size={24} className="mx-auto mb-2 text-emerald-600" />
                  <p className="text-sm text-gray-700">
                    Вы уже получили <span className="font-bold text-emerald-600">{discountsEarned}</span> {discountsEarned === 1 ? 'скидку' : 'скидки'}! Продолжайте оставлять отзывы.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Дашборд для партнёров</h2>
              <p className="text-gray-600">Управляйте отзывами и отслеживайте аналитику</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Всего отзывов</span>
                  <Icon name="MessageSquare" size={20} className="text-emerald-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-400 mt-1">Статистика обновится после первых отзывов</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Средний рейтинг</span>
                  <Icon name="Star" size={20} className="text-amber-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">—</p>
                <p className="text-sm text-gray-400 mt-1">Ожидаем первые отзывы</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Активных садов</span>
                  <Icon name="Users" size={20} className="text-emerald-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-400 mt-1">Первые пользователи появятся скоро</p>
              </Card>
            </div>

            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Последние отзывы</h3>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Icon name="MessageSquare" size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-600 font-medium mb-2">Пока нет отзывов</p>
                <p className="text-sm text-gray-500">Здесь будут отображаться отзывы ваших клиентов</p>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Возможности</h3>
                <ul className="space-y-3">
                  {[
                    'Автопубликация отзывов на сайт',
                    'QR-коды для каждого товара',
                    'Детальная аналитика',
                    'Модерация отзывов',
                    'Система лояльности',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={18} className="text-emerald-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <h3 className="text-xl font-bold mb-2">Начните сегодня</h3>
                <p className="text-emerald-50 mb-6">
                  Подключитесь к Feedback Garden и увеличьте количество отзывов в 3 раза
                </p>
                <Button variant="secondary" size="lg" className="w-full" onClick={() => setActiveTab('pricing')}>
                  Выбрать тариф
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="animate-fade-in">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Тарифные планы</h2>
              <p className="text-gray-600">Выберите подходящий план для вашего бизнеса</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-xl transition-shadow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Базовый</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">990₽</span>
                    <span className="text-gray-600">/мес</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Без печатных QR-кодов',
                    'Отзывы на 1 филиал/10 товаров',
                    'Без рекламы на сайте',
                    'Онлайн QR-коды включены',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-emerald-600" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">Выбрать</Button>
              </Card>

              <Card className="p-6 border-2 border-emerald-500 hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Популярный
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Профи</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">2,990₽</span>
                    <span className="text-gray-600">/мес</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'До 50 печатных QR-кодов',
                    'Отзывы на 3 филиала/50 товаров',
                    'Реклама 6 часов в сутки',
                    'Онлайн QR-коды включены',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-emerald-600" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Выбрать</Button>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Премиум</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">5,990₽</span>
                    <span className="text-gray-600">/мес</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'До 200 печатных QR-кодов',
                    'Отзывы на 10 филиалов/200 товаров',
                    'Реклама 24/7 на сайте',
                    'Личная поддержка',
                    'Онлайн QR-коды включены',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-emerald-600" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">Выбрать</Button>
              </Card>
            </div>

            <Card className="mt-12 p-8 bg-gray-50">
              <h3 className="text-xl font-bold mb-6 text-center">Часто задаваемые вопросы</h3>
              <div className="space-y-4 max-w-2xl mx-auto">
                {[
                  {
                    q: 'Как создаются QR-коды?',
                    a: 'После подключения тарифа вы получаете доступ к панели генерации QR-кодов. Создавайте код для каждого товара за пару кликов.',
                  },
                  {
                    q: 'Как отзывы попадают на мой сайт?',
                    a: 'Мы предоставляем API и готовые виджеты для интеграции. Отзывы публикуются автоматически после модерации.',
                  },
                  {
                    q: 'Что если клиент оставит негативный отзыв?',
                    a: 'Все отзывы проходят модерацию. Вы можете скрыть неконструктивные отзывы и ответить на критику публично.',
                  },
                ].map((faq, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-0">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;