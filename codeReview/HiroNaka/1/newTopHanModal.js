$(function(){

	var han = $.cookies.get("han_HALL");
	var $fairModalStyledCheckBox;
	var $areaStyledCheckBoxes;

	var $fairCalendarModal;
	var $fairAreaSearchModal;

	var $areaRealTimeFlag = true,
		$fairRealTimeFlag = {
			fair: true,
			area: true,
			date: true
		},
		$fairData = {
			fair: null,
			area: {
				tdfkn: null,
				area: null,
			},
			date: null
		}
		$areaOpenFunc = $.noop,
		$fairOpenFunc = $.noop;

//==================== リアルタイム件数表示処理 ====================
//---------- エリア ----------
	var areaSearchHit = function() {
		if ( $areaRealTimeFlag ) {
			$areaRealTimeFlag = false;
		} else {
			$areaOpenFunc();
			return;
		}
		var $parent = $('#jsiAreaSearchWrap'),
			$target = $('.hitCountNum', $parent),
			$getList = $('.jscCheckbox', $parent),
			$hideFlag = false,
			$timer,
			//ajax送信用データ作成処理
			createData = function() {
				var $data = {};
				$data['tdfkn'] = [];
				$data['area'] = [];
				//県内全件チェックボックスを除いたon状態のinput in valueを配列に入れる
				$getList.each(function() {
					if ($(this).hasClass('on')) {
						if ($(this).hasClass('todofukenCheckbox')) {
							$data['tdfkn'].push($(this).find('input').attr('value'));
						} else {
							$data['area'].push($(this).find('input').attr('value'));
						}
					}
				});
				for (var $key in $data) {
					if(!$data[$key].length) delete $data[$key];
				}
				return $data;
			},
			//件数取得ajax処理
			getHit = function($data,$success) {
				$.ajax({
					type: 'GET',
					url:'/s/ajaxDummy/hit.txt',
					dataType: 'text',
					data: JSON.stringify($data),
					success: function($num) {
						$success($num);
					},
					error: function() {
						$target.text('--');
					}
				});
			};

		//モーダル表示時に行う処理
		$areaOpenFunc = function() {
			var $data = createData();
			if (typeof($data['area']) !== 'undefined') {
				var $success = function($num) {
					$target.text($num);
				};
				getHit($data, $success);
			} else {
				$hideFlag = true;
				$target.parents('li').hide().parent().addClass('full');
			}
			console.log(JSON.stringify($data));//送信データ確認用
		};

		$areaOpenFunc();

		//チェックボックスクリック時に行う処理
		$getList.bind('click', function() {
			if ($hideFlag) $target.parents('li').show().parent().removeClass('full');
			clearTimeout($timer);
			var $data = createData();
			var $success = function($num) {
				$target.text($num).removeClass('changing').addClass('active');
				$timer = setTimeout(function(){
					$target.addClass('changing').removeClass('active');
				}, 400);
			};
			//ajax処理呼び出し
			getHit($data, $success);
			console.log(JSON.stringify($data));//送信データ確認用
		});
	};

//---------- フェア ----------
	var fairSearchHit = function($targetName) {
		if ( $fairRealTimeFlag[$targetName] ) {
			$fairRealTimeFlag[$targetName] = false;
		} else {
			$fairOpenFunc();
			return;
		}
		var $parent = {
				fair: $('#form-fair'),
				area: $('#jsiFairAreaSearchWrap'),
				date: $('#jsiCalendarContainer')
			},
			$target = {
				fair: $('.fairSearchSubmit .hitCountNum', $parent['fair']),
				area: $('.hitCountNum', $parent['area']),
				date: $('.hitCountNum', $parent['date'])
			},
			$getList = {
				fair: $('.fairEvent .jscCheckbox', $parent['fair']),
				area: $('.jscCheckbox', $parent['area']),
				date: $('input', $parent['date']).parent('td')
			},
			$timer,
			//各ajax送信用データ作成処理
			createEachData = function($targetName) {
				var $setData,
					$data = {};
				if ($targetName === 'area') $data['tdfkn'] = [];
				$data[$targetName]  = [];
				//モーダル毎の条件定義
				switch ($targetName) {
					case 'fair':
						$setData = function(item) {
							if (item.hasClass('on')) {
								$data[$targetName].push(item.find('input').attr('value'));
							}
						};
						break;
					case 'area':
						$setData = function(item) {
							if (item.hasClass('on')) {
								if (item.hasClass('todofukenCheckbox')) {
									$data['tdfkn'].push(item.find('input').attr('value'));
								} else {
									$data[$targetName].push(item.find('input').attr('value'));
								}
							}
						};
						break;
					case 'date':
						$setData = function(item) {
							if (item.hasClass('selectedCell')) {
								$data[$targetName].push(item.find('input').attr('value'));
							}
						};
						break;
				}
				//上で定義した処理を実行
				$getList[$targetName].each(function() {
					$setData($(this));
				});
				return $data;
			},
			//全ajax送信用データ作成処理
			createDataAll = function() {
				$fairData['fair'] = createEachData('fair');
				$fairData['area'] = createEachData('area');
				$fairData['date'] = createEachData('date');
			},
			//全データを結合する処理
			createData = function() {
				var $data = $.extend({}, $fairData['fair'], $fairData['area'], $fairData['date']);
				for (var $key in $data) {
					if(!$data[$key].length) delete $data[$key];
				}
				return $data;
			},
			//件数取得ajax処理
			getHit = function($data,$success) {
				$.ajax({
					type: 'GET',
					url:'/s/ajaxDummy/hit.txt',
					dataType: 'text',
					data: JSON.stringify($data),
					success: function($num) {
						$success($num);
					},
					error: function() {
						$target.text('--');
					}
				});
			};

		//fairモーダル表示時に行う処理
		$fairOpenFunc = function() {
			createDataAll();
			var $data = createData();
			var $success = function($num) {
				$target[$targetName].text($num);
			};
			getHit($data, $success);
			console.log(JSON.stringify($data));//送信データ確認用
		};
		$fairOpenFunc();

		//チェックボックスクリック時に行う処理
		$getList[$targetName].bind('click', function() {
			clearTimeout($timer);
			$fairData[$targetName] = createEachData($targetName);
			var $data = createData();
			var $success = function($num) {
				$target[$targetName].text($num).removeClass('changing').addClass('active');
				$timer = setTimeout(function(){
					$target[$targetName].addClass('changing').removeClass('active');
				}, 400);
			};
			//ajax処理呼び出し
			getHit($data, $success);
			console.log(JSON.stringify($data));//送信データ確認用
		});


	};

//==================== 内部機能 ====================
//---------- アコーディオン ----------
	$('.jsc-accordion-trigger').live('click', function(){
		$self = $(this);
		$target = $self.closest('.fairTypeSearchInner').find('.jsc-accordion-target');
		if($target.is(':visible')) {
			$target.slideUp(200, function() {$self.removeClass('on');});
		} else {
			$target.slideDown(200, function() {$self.addClass('on');});
		}
	});

//---------- モーダル表示時アコーディオン状態制御 ----------
	var displayAccordion = function($scope) {
		var $item = $('.jsc-accordion-trigger', $scope);
		$item.each(function() {
			if ($(this).next().find('.jscCheckbox.on').length) {
				$(this).addClass('on').next().show();
			} else {
				$(this).removeClass('on').next().hide();
			}
		});
	};

//==================== 初回表示と「他のエリアを選択する」クリック時のモーダル設定 ====================
	var hanModalOptions = {
		mainContainer : '.page',
		openTrigger : '.totalAreaSelect, .jscFairAreaChange, .jscAreaChange',
		closeTrigger : '.modalCancelBtn',
		submitTrigger : '.jscTgtAreaTrigger',
		onOpen : function($trigger){
			if ($trigger.hasClass('jscFairSearchTrigger') || $trigger.hasClass('jscFairAreaChange')){
				$('#jsiTotalAreaModal .jscTgtAreaTrigger').addClass('fair').removeClass('area');
				$('.jscFairSearchTtl', $totalAreaModal).show();
			}else{
				$('#jsiTotalAreaModal .jscTgtAreaTrigger').addClass('area').removeClass('fair');
				$('.jscAreaSearchTtl', $totalAreaModal).show();
			}
		},
		onClose : function(){
			$('.jscFairSearchTtl', $totalAreaModal).hide();
			$('.jscAreaSearchTtl', $totalAreaModal).hide();
			$areaRealTimeFlag = true;
			for (var i in $fairRealTimeFlag) {
				$fairRealTimeFlag[i] = true;
			}
		},
		onSubmit : function($trigger){
			var targetAreaData = $trigger.data('target');
			$.cookies.set("han_HALL" , targetAreaData, {hoursToLive: 240000});

			if ($trigger.hasClass('fair')){
				openPanel($fairModal);
			}else{
				openPanel($hallSearchModal);
			}

			$('.totalAreaSelect.jscFairSearchTrigger').removeClass('totalAreaSelect').addClass('fairSelect');
			$('.totalAreaSelect.jscAreaSearchTrigger').removeClass('totalAreaSelect').addClass('areaSelect');


		}

	};
	if(han != null && han != 'none'){
		jQuery.extend(hanModalOptions , {openTrigger : '.jscFairAreaChange, .jscAreaChange'});
	}

	var $totalAreaModal = $('#jsiTotalAreaModal').xyModal(hanModalOptions);//returnでオブジェクトが返る


//==================== 「ブライダルフェアから探す」クリック時のモーダル設定 ====================
	var fairModalOptions = {
		mainContainer : '.page',
		openTrigger : '.fairSelect',
		closeTrigger : '.modalCancelBtn',
		submitTrigger : '.fairSearchSubmit',
		onOpen : function(){
			getSelectedFairAreaLabel();
			getSelectedFairDateLabel();
			fairSearchHit('fair');
		},
		onSubmit : function(){
			$fairModalStyledCheckBox.commit('#form-fair .fairEvent .jscCheckbox');
			setSearchAreaToLocalStorage('form-fair');
		},
		targetForm : '#form-fair'
	};
	if(han != null && han != 'none'){
		jQuery.extend(fairModalOptions , {openTrigger : '.jscFairSearchTrigger'});
	}

	var $fairModal = $('.jsiAcd').xyModal(fairModalOptions);//returnでオブジェクトが返る

//---------- 子モーダル（挙式エリア）内でcheckedになっている要素を探し、親モーダルにテキストをセットする ----------
	var getSelectedFairAreaLabel = function(){
		var areaList = [];

		$('#jsiFairAreaSearchWrap :checked').each(function(){
			areaList.push($(this).closest('li').find('span.facetAreaName').text());
		});

		var label = areaList.length == 0 ? '指定なし' : areaList.join(',');

		$('#jsiSearchArea').text(label);
	};

//---------- 子モーダル（来館日）内でcheckedになっている要素を探し、親モーダルにテキストをセットする ----------
	var getSelectedFairDateLabel = function(){
		var dateList = [];
		var DAY_LABEL = ['日', '月', '火', '水', '木', '金', '土'];

		$('#jsiCalendarContainer .jscCalendar td.selectedCell :checked').each(function(){
			var $self = $(this),
				value = $self.val(),
				year = parseInt(value.substring(0, 4), 10),
				month = parseInt(value.substring(4, 6), 10),
				date = parseInt(value.substring(6, 8), 10),
				day = (new Date(year, month - 1, date)).getDay();

			dateList.push(month + '月' + date +'日(' + DAY_LABEL[day] + ')');
		});
		var label = dateList.length == 0 ? '指定なし' : dateList.join(',');
		$('#jsiSearchDate').text(label);
	};

//---------- 「来館日 変更」クリック時のモーダル設定 ----------
	var calendarModalOptions = {
		'mainContainer' : '.page',
		'showOnClose' : $fairModal,
		'onOpen': function() {
			fairSearchHit('date');
		},
		'onSubmit': function() {
			$fairCalendarModal.$modal.close();
		}
	};

//---------- 「挙式エリア/変更」クリック時のモーダル設定 ----------
	var fairAreaModalOptions = {
		'mainContainer' : '.page',
		'showOnClose' : $fairModal,
		'onOpen': function() {
			fairSearchHit('area');
		}
	};

//==================== 「エリアから探す」クリック時のモーダル設定 ====================
	var hallSearchModalOptions = {
		'mainContainer' : '.page',
		'openTrigger' : '.jscAreaSearchTrigger',
		'closeTrigger' : '.modalClose',
		'submitTrigger' : '.areaSearchSubmit',
		onOpen : function(){
			displayAccordion('#jsiAreaSearchWrap');
			areaSearchHit();
		},
		onClose : function(){
			$areaStyledCheckBoxes.rebuildStyle();
		},
		onSubmit : function(){
			$areaStyledCheckBoxes.commit();
			setSearchAreaToLocalStorage('form-area');
		},
		targetForm : '#form-area'
	};

	var $hallSearchModal = $('.todofukenPanel').xyModal(hallSearchModalOptions);//returnでオブジェクトが返る

//==================== ローカルに検索エリアを保存（どちから一方の最新データを保有する） ====================
	var setSearchAreaToLocalStorage = function(targetFormId) {
		var $submitForm = $('#' + targetFormId);
		var checkedArea = $submitForm.find('[name=area]' + ':checked').map(function(){
			return $(this).val();
		}).get().join(',');
		xyLocalStorage.setItem('sp_area', checkedArea);
	};

	var getSearchAreaFromLocalStorage = function(targetFormId) {
		var area = xyLocalStorage.getItem('sp_area');
		if (area) {
			var areaArray = area.split(',');
			for (var index = 0; index < areaArray.length; index++) {
				$('#' + targetFormId).find('.jscCheckbox').find('input:checkbox[value=' + areaArray[index] + ']').each( function () {
					$(this).attr('checked', true);
					$(this).parent("label").parent(".jscCheckbox").addClass('on');
				});
			}
		}
	};


//==================== エリアデータ読込 ====================
	var getAreaPanelData = function(onSuccess){
		var hanName = $.cookies.get("han_HALL");
		$.ajax({
			type: 'GET',
			url:'/s/ajaxDummy/generalArea.html',
			dataType: 'html',
			data: {
				han : hanName,
				gyoshuLCd : 'HALL'
			},
			success: function(data) {

				//取得したソースをモーダルラップに設定
				$hallSearchModal.html(data);

				//チェックボックスクリック時の挙動設定
				$areaStyledCheckBoxes = $('.jscCheckbox',  $hallSearchModal).xyStyledCheckBox({
					'onCheckOn' : function($styledCheckBox){//$styledCheckBoxはonがaddされたli要素
						if($styledCheckBox.hasClass('todofukenCheckbox')){
							$styledCheckBox.closest('ul').find('li:not(.todofukenCheckbox)').addClass('on');
						}
					},
					'onCheckOff' : function($styledCheckBox){//$styledCheckBoxはonがremoveされたli要素
						if($styledCheckBox.hasClass('todofukenCheckbox')){
							$styledCheckBox.closest('ul').find('.jscCheckbox:not(.todofukenCheckbox)').removeClass('on');
						}else{
							$styledCheckBox.closest('ul').find('.jscCheckbox.todofukenCheckbox').removeClass('on');
						}

					}
				});

				getSearchAreaFromLocalStorage('form-area');

				if(onSuccess){
					onSuccess();
				}

			},
			error:function() {
			}
		});
	};

//==================== フェアデータ読込 ====================
	var getFairPanelData = function(onSuccess){
		var hanName = $.cookies.get("han_HALL");
		$.ajax({
			type: 'GET',
			url:'/s/ajaxDummy/generalFair.html',
			dataType: 'html',
			data: {
				han : hanName,
				gyoshuLCd : 'HALL'
			},
			success: function(data) {

				$('.jsiAcd').html(data);

				jQuery.extend(fairAreaModalOptions, {
					'onOpen' : function(){
						var $accordionTrigger = $('.jsc-accordion-trigger');
						$accordionTrigger.filter('.off').closest('.fairTypeSearchInner').find('.jsc-accordion-target').hide();
						$accordionTrigger.removeClass('off');
						displayAccordion('#jsiFairAreaSearchWrap');
						fairSearchHit('area');
					},
					'onClose' : function(){
						$areaStyledCheckBoxes.rebuildStyle();
					},
					'onSubmit' : function(){
						$areaStyledCheckBoxes.commit();
						$fairAreaSearchModal.close();
					}
				});
				
				$fairCalendarModal = $('#jsiCalendarContainer').xyCalendarModal(calendarModalOptions);
				$fairAreaSearchModal = $('#jsiFairAreaSearchWrap').xyModal(fairAreaModalOptions);

				$fairModalStyledCheckBox = $('.fairEvent .jscCheckbox', $fairModal).xyStyledCheckBox();
				//チェックボックスクリック時の挙動設定
				var $areaStyledCheckBoxes = $('#jsiFairAreaSearchWrap .jscCheckbox', $fairModal).xyStyledCheckBox({
					'onCheckOn' : function($styledCheckBox){//$styledCheckBoxはonがaddされたli要素
						if($styledCheckBox.hasClass('todofukenCheckbox')){
							$styledCheckBox.closest('ul').find('li:not(.todofukenCheckbox)').addClass('on');
						}
					},
					'onCheckOff' : function($styledCheckBox){//$styledCheckBoxはonがremoveされたli要素
						if($styledCheckBox.hasClass('todofukenCheckbox')){
							$styledCheckBox.closest('ul').find('.jscCheckbox:not(.todofukenCheckbox)').removeClass('on');
						}else{
							$styledCheckBox.closest('ul').find('.jscCheckbox.todofukenCheckbox').removeClass('on');
						}

					}
				});
				$fairModalStyledCheckBox.rebuildStyle();
				$areaStyledCheckBoxes.rebuildStyle();

				getSearchAreaFromLocalStorage('form-fair');

				if(onSuccess){
					onSuccess();
				}
			},
			error:function() {
			}
		});

	};

//==================== ajax読込設定 ====================
	var openPanel = function($modal){
		if ($modal == $fairModal){//BFモーダル内で他のエリアが選択された際に発火
			getFairPanelData(function(){
				$fairModal.open();
				getAreaPanelData();
			});
		}else if ($modal == $hallSearchModal){//エリアモーダル内で他のエリアが選択された際に発火
			getAreaPanelData(function(){
				$hallSearchModal.open();
				getFairPanelData();

			});
		}else{//下の事前読込用で発火
			getFairPanelData(function(){
				getAreaPanelData();

			});
		}

	};

//---------- //事前読込用 ----------
	if(han != null && han != 'none'){
		openPanel();
	}

});